/**
 * @param length ความยาวขงอรหัส
 * @describe ใช้ในการ Generate รหัสหรือข้อมูลที่มีความยา n
 */

const reservationCodeGenerate = (length : number) : string => {
    let result = ""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%@#&!*_+"

    for(let i = 0; i < length; i++){
        const pos = Math.floor(Math.random() * characters.length)
        result += characters.charAt(pos)
    }

    return result 
}

export default reservationCodeGenerate