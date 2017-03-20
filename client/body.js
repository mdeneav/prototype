import { Template } from 'meteor/templating';

import './body.html';

Template.cells.onRendered(function(){
  var data = function () {
    return Handsontable.helper.createSpreadsheetData(100, 20);
  };

  var container = document.getElementById('example');

  hot = new Handsontable(container, {
      formulas: true,
      data: data(),
      minSpareCols: 1,
      minSpareRows: 1,
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true,
      beforeChange: function (changes) {
        if(changes != null){
          var newVal = changes[0][3];
          if(newVal.startsWith("*")){
            var cell = $('td.current').eq(0);
            cell.attr("id", newVal.substr(1));
            // changes[0][3] = newVal.substr(1) can do this if desired, but leave for now to stay obvious
          }
        }
      },
      afterChange: function(changes){
        if(changes != null){
          var newVal = changes[0][3];
          var triggerObject = parser(newVal);

          if(triggerObject.trigger.length > 0){ // need a trigger (will need more checking later)
            makeEventHandler(triggerObject);
          }
        }
      }
    });
});
