/*获取子类页的code*/
'use strict';

export async function getCode(code,_this) { 
    let category  = _this.mysql('category');

    /*获取频道页的关键字，描述，标题和ID*/
    let getCode = await _this.findAllMap([
        {
          model: category,
          arg: {
              attributes: ['title','keywords','description','id','parent_id','name','support3Level','list_template_id'],
              where: {
                  code: code,
                  deleted: 0,
                  $not: [
                    {level: 0}
                  ]
              }
          }
        }
      ]);

      getCode = await _this.resultMap(getCode);
      getCode = getCode[0][0] ? getCode[0][0] : {parent_id: ''};

    if(getCode){
      /*根据频道页的ID 获取该ID下所有子类*/
        var  getMenu = await _this.findAllMap([
          {
            model: category,
            arg: {
                attributes: ['name','code','id','bili_name'],
                where: {
                    parent_id: getCode.parent_id,
                    deleted: 0
                }
            }
          }
        ]);
        getMenu = await _this.resultMap(getMenu);
        getMenu = getMenu[0];
        // console.log(getMenu);
    }else{
      getMenu = [];
    }
    

    return {
        getMenu: getMenu,
        getCode: getCode
    }
}