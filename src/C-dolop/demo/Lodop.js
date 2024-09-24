import getLodop from "../../C-dolop/LodopFuncs";
import { encryptAES, decryptAES } from "../../CrypotJS/index";
export function Open_Lodop() {
    const LODOP = getLodop()
    LODOP.PRINT_INIT("");
    LODOP.PRINT_DESIGN()
    //LODOP.PRINT_INIT("");
    //LODOP.ADD_PRINT_TABLE(28,15,488,357,"[{MBTable}]")
}
/**
 * 执行打印
 * @param {*} condition 
 * condition 参数:对象
 */

export function Execute_Print() {
    //请求1:数据源      Data_source
    let res = []
    let Data_source = []
    //请求2:测试模版    Data_temp
    let testTemp = []
    let Data_temp = []
    let Data_temp1 = []
    if (res.data.Code == 0 && testTemp.data.Code == 0) {
        if (res.data.Data.length && testTemp.data.Data.length) {
            Data_source = res.data.Data
            Data_temp = testTemp.data.PDA_Temp.PDA_UIField      //模版的字符串
            Data_temp1 = testTemp.data.PDA_Temp.PDA_UIFieldInfo //table的字符串
            for (let j = 0; j < Data_source.length; j++) {
                for (let i = 0; i < Data_temp.length; i++) {
                    if (Data_source[j].DYBS == Data_temp[i].PDA_Field) {
                        for (let tb = 0; tb < Data_temp1.length; tb++) {
                            if (_PDATYPE[i].PDA_Field == _PDATYpeTbale[tb].PDA_Field) {
                                const LODOP = getLodop()
                                //第一步 转换表格的特殊符号  '<'  '>'
                                //tem_table:表的字符串
                                let Table_temp1 = Replacement(_PDATYpeTbale[tb].PDA_FieldName)
                                // console.log(Table_temp1);
                                //第二步 将数据绑定到表格上面
                                let Temp_code1 = Corresp(Table_temp1, Data_source[j])
                                // console.log(Temp_code1);
                                //第三步 还原表格的特殊符号  '<'  '>'
                                let Table_temp2 = ReplacementFanWiter(Temp_code1)
                                // console.log(Table_temp2);
                                //第四步 将表个绑定到模版代码 标识为 [{MBTable}]
                                let Temp_code2 = CorrespTable(Data_temp[i].PDA_FieldName, { "MBTable": Table_temp2 })
                                // console.log(Temp_code2);
                                //第五步 完成最终打印模版
                                console.log(Corresp(Temp_code2, Data_source[j]));
                                eval(Corresp(Temp_code2, Data_source[j]))
                                LODOP.PRINT_DESIGN("");
                                // LODOP.PRINT()//直接打印
                            }
                        }
                    }
                }
            }
        }
    }
}
/**
 * 1.规则 [{}] 模版绑定表格
 * 2.规则 {{}} 表格绑定数据
 */
function CorrespTable(tem, data) {
    //对应表格
    // console.log(tem);
    // console.log(data);
    const template = tem
    const replacedTemplate = template.replace(/\[\{([^']+)\}\]/g, (match, key) => {
        console.log(key);
        return data[key] || '';
    });
    // console.log(2);
    // console.log(replacedTemplate); //输出替换后的模板内容为匹配数据
    return replacedTemplate
}
function Corresp(tem, data) {
    //模版字段对应
    // console.log(tem);
    // console.log(data);
    const template = tem
    const replacedTemplate = template.replace(/{{(.*?)}}/g, (match, key) => {
        // console.log(data[key]);
        if (key == 'DDATE') {
            data[key] = dayjs(data[key]).format('YYYY-MM-DD')
        }
        // console.log(data[key]);
        return data[key] || '';
    });
    // console.log(4);
    // console.log(replacedTemplate); //输出替换后的模板内容为匹配数据
    return replacedTemplate
}
/**
 * 
 * @param tem 表格代码
 * @param data 数据
 */
function Replacement(tem) {
    let pattern = /</g;
    let replacement = "$";
    let result = tem.replace(pattern, replacement);
    let pattern1 = />/g;
    let replacement1 = "@";
    let result1 = result.replace(pattern1, replacement1);
    // console.log(1);
    // console.log(result1);
    return result1
}
/**
 * 
 * @param tem 反写的模版
 */
function ReplacementFanWiter(tem) {
    // console.log('进入');
    let pattern = /\$/g;
    let replacement = "<";
    let result = tem.replace(pattern, replacement);
    let pattern1 = /\@/g;
    let replacement1 = ">";
    let result1 = result.replace(pattern1, replacement1);
    // console.log(3);
    // console.log(result1);
    return result1
}