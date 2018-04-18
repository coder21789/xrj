/*获取频道页的code*/
'use strict';

export async function getCode(_this) { 
    let category  = _this.mysql('category');

    /*获取频道页的关键字，描述，标题和ID*/
    let getCode = await _this.findAllMap([
        {
          model: category,
          arg: {
              order: "order_no ASC",
              attributes: ['code','name','id','order_no'],
              limit: 14,
              where: {
                  deleted: 0,
                  level: 0
              }
          }
        }
      ]);

      getCode = await _this.resultMap(getCode);
      getCode = getCode[0];
     return getCode;
}