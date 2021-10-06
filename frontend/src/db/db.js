import Localbase from 'localbase';


let db = new Localbase('db');

export function SetDB(dbname,data){
    db.collection(dbname).set(data);
    }
export function AddDB(dbname,data){
    data.id = 'offline'
    console.log(data);
    db.collection(dbname).add(data);
    }
export function UpdateDB(dbname,data,updatefor){
    db.collection(dbname).doc(updatefor).update(data);
}
export async function GetDB(dbname){
    var result; 
    await db.collection(dbname).get()
    .then(res=>{
        result = res
    });
    return result;
    }

