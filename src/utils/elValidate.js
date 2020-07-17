function notNull(rule, value, callback) {
  if (!value) {
    callback(new Error(rule.label + '不能为空'));
  } else {
    callback();
  }
}

function notNullAndEqual(rule, value, callback) {
  console.debug(rule)
  let firstVal  = rule.ref[rule.refForm][rule.refField];
  if (value === '') {
    callback(new Error(rule.label + '不能为空'));
  } else if (value !== firstVal) {
    callback(new Error('两次输入不一致!'));
  } else {
    callback();
  }
}


export default {
  notNull,notNullAndEqual
}
