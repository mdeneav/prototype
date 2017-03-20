
makeEventHandler = function(triggerObject){
  var trigger = document.getElementById(triggerObject.trigger[0]);

  if(trigger != null){
    // Create handler for trigger
    trigger.onclick = function(){
      // look through all cells, will need to optimize later
      renderOnTrigger(triggerObject.trigger[0]);
    }
  }
  else {
    alert("There isn't a trigger with this name!");
  }
}

var renderOnTrigger = function(trigger){
  console.log("rendering because a trigger: "+trigger+", was clicked");
  var colNum = hot.countCols(),
      rowNum = hot.countRows();

  for(row = 0; row < rowNum; row ++){
    for(col = 0; col < colNum; col++){
      var cell = hot.getCell(row, col),
          triggerObject;
      if(cell != null){
        triggerObject = parser(cell.innerHTML);
      }

      //must have a trigger and must be the one that was triggered
      if(triggerObject.formula.length > 0 && triggerObject.trigger[0] == trigger){
        if(triggerObject.formula.match(/(if)\(([^)]+)\)/) != null){
          var res = conditionsEval(triggerObject.formula);

          //save current evaluated value into cell
          var triggerFunction = cell.innerHTML.substr(cell.innerHTML.indexOf(',')+1);
          hot.setDataAtCell(row, col, res+' ,' + triggerFunction); //first is current val, then formula
        }
      }
    }
  }
}

var conditionsEval = function(conditions){
  if(conditions.match(/(if)\(([^:]+)\)/) == null){ //no conditions (base case)
    return conditions;
  }

  var condition = conditions.match(/(if)\(([^)]+)\)/).splice(2,1);
  var left = conditions.substring(conditions.indexOf(')')+1, conditions.indexOf(":"));
  var right = conditions.substring(conditions.indexOf(":")+1);

  if(eval(condition[0])){
    return conditionsEval(left);
  }

  return conditionsEval(right);
}
