import {adjust} from './adjust';

export const dateLong=(input)=>{
  let d=new Date();
  d.setTime(input);
  return `${d.getFullYear()}-${adjust(d.getMonth()+1)}-${adjust(d.getDate())} ${adjust(d.getHours())}:${adjust(d.getMinutes())}:${adjust(d.getSeconds())}`
};