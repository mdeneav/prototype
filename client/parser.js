parser = function(text) {
  var cellContent = {},
      triggerPattern = /(?:@)([^|\s]+)/;
      conditionsPattern = /(if|else)\(([^:]+)\)/,
      formulaPattern = /(?::=\s?)([^,]+)/;

  cellContent.trigger = tryParse(text, triggerPattern);
  // cellContent.conditions = tryParse(text, conditionsPattern); //eval to actual conditions
  // cellContent.formula = tryParse(text, formulaPattern);
  cellContent.formula = text.substr(text.indexOf("|")+1);

  return cellContent;

 }

 var tryParse = function(text, pattern){
   var res = text.match(pattern)

   if(res != null){
     res.splice(0,1); //return only the groups
     return res;
   }

   return [];
 }

//needs checking of some sort in practice ...
