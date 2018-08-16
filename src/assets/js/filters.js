
//货币类型过滤
let countType = value => {
    if(value=="CNY"){
        return "CNY(人民币)"
    }
    else  if(value=="USD"){
        return "USD(美元)"
    }
  }

//保留4位小数
let tofix = value => {
   return value.toFixed(4)
  }

  export { countType ,tofix}
//export { evenNumbers, capitalize }