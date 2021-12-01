exports.setDefaultIfNeeded = (order,sort_by) => {
   if (order === undefined && sort_by === undefined) {
       order = 'DESC';
       sort_by = 'created_at';
       return [order,sort_by];
   } else if (order === undefined && sort_by !== undefined) {
       order = 'DESC';
       return [order,sort_by];
   } else if (order !== undefined && sort_by == undefined) {
       sort_by = 'created_at';
       return [order,sort_by]
   }
   else {
   return [order,sort_by]
   }
}