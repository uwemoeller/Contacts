﻿// A simple log for the output
 var log = "Count employees-before: " + ds.Employee.length + ", Count companies-before: " + ds.Company.length;

  // Main function
 function doImportEmpsAndComps () {
     /*   The doc. to import is in the solution folder, in a subfolder
         named "Import". We load the full document in one shot  (loadText) 
         and split it in an array (one line = one element).
     */
     var lines = loadText( ds.getModelFolder().path + "Import/emps_comps.txt" ).split("\n");
       /*   Declare the variable that will hold the columns of each line.
           We know the columns will be:
            columns[0]   Name of the company
            columns[1]   Last name of the employee
            columns[2]   First name
            columns[3]   Salary
     */  
   var columns = [];
       // Now, loop for each entry in the array  
lines.forEach( function(oneLine) {  
      // Get the columns for current line  
columns = oneLine.split("\t");    

      // Get the company. Create it if needed.
      var theComp = ds.Company.find("name = :1", columns[0]);
      if(theComp == null) { // Not found => create it
           theComp = new ds.Company({
            name : columns[0] 
         });
         // Save it  
         theComp.save();
           }    
      // Get the employee. Create it if needed. 
       var theEmp = ds.Employee.find("lastName = :1 and firstName = :2", columns[1], columns[2]);
      if(theEmp == null) {
         theEmp = new ds.Employee( {
            lastName    : columns[1],
            firstName    : columns[2],
            salary   : columns[3],
            employer   : theComp // This is how you bind two entities with Wakanda!
         }); 
      } else {
         theEmp.salary = columns[3],
         theEmp.employer = theComp;
      }
        theEmp.save();
     });
 }
 // Call the function 
doImportEmpsAndComps ();
 
 // Log result
log += " / Count employees-after: " + ds.Employee.length + ", Count companies-after: " + ds.Company.length;

