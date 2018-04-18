/*获取子类页的code*/
'use strict';

export async function getCode(code,_this) { 
    let category  = _this.mysql('category');

    /*获取频道页的关键字，描述，标题和ID*/
    let getCode = await _this.findAllMap([
        {
          model: category,
          arg: {
              attributes: ['title','keywords','description','id','parent_id','name','code'],
              where: {
                  code: code,
                  deleted: 0
              }
          }
        }
      ]);

      getCode = await _this.resultMap(getCode);
      getCode = getCode[0][0];
  if(getCode){
      //父类code
      var channel = await _this.findAllMap([
          {
            model: category,
            arg: {
                attributes: ['name','code','id','parent_id'],
                where: {
                    id: getCode.parent_id,
                    deleted: 0
                }
            }
          }
      ]);
      channel = await _this.resultMap(channel);
      channel = channel[0][0];

      //祖父类code
      var parentCategory = await _this.findAllMap([
          {
            model: category,
            arg: {
                attributes: ['name','code','id'],
                where: {
                    id: channel.parent_id,
                    deleted: 0
                }
            }
          }
      ]);
      parentCategory =  await _this.resultMap(parentCategory);
      parentCategory = parentCategory[0][0];

          /*根据频道页的ID 获取该ID下所有子类*/
      var getMenu = await _this.findAllMap([
        {
          model: category,
          arg: {
              attributes: ['name','code','id'],
              where: {
                  parent_id: channel.parent_id,
                  deleted: 0
              }
          }
        }
      ]);
      getMenu = await _this.resultMap(getMenu);
      getMenu = getMenu[0];
    }else{
        channel = getMenu = parentCategory = [];
    }

    return {
        getCode: getCode,
        channel: channel,
        getMenu: getMenu,
        parentCategory: parentCategory
    }
}