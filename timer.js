import ps_list from 'ps-list';
import { exec } from 'child_process';

var time_end = 70;

var list_app = [
    "REDprelauncher.exe",
    "AssassinsCreed_Dx9.exe",
    "TLauncher.exe",
    "Blasphemous 2.exe",
    "GWT.exe",
    "FarLoneSails.exe",
    // "Telegram.exe",
];

function warn_window(message){
    exec(`msg * ${message}`);
}

async function close(time_close){

    time_close *= 1000 * 60;

    if(time_close <= 0){
       warn_window("ERROR: Некорректное время");
       return;
    }

    let list_all_processes = await ps_list();
    let list_app_processes = list_all_processes.filter(proc => list_app.includes(proc.name));
    
    if(list_app_processes.length === 0){
        setTimeout(()=>{close(time_end)}, 30000);
    }
    else{
        let str_app = list_app_processes.map(app => 
            app.name.substring(0, app.name.length - 4)).join(", ");

        warn_window(`ПОЕХАЛИ ты включил ${str_app}, у тебя У ТЕБЯ ${time_close / 60000} минут`);
    }

    await new Promise((resolve)=>{
        setTimeout(()=>{
            warn_window("Выключаю через 1 минута");
        }, time_close - 60000);
    
        setTimeout(()=>{
            warn_window("IN THE END");
            resolve();
        }, time_close);
    });

    for(let work_processes of list_app_processes){
        exec(`taskkill /PID ${work_processes.pid} /F`, (err)=>{
            if(err){
                warn_window(err);
            }
        });
    }
}

close(time_end);


/*
вместо \n => \r\n

\n — это символ новой строки, используемый в Unix-производных системах, таких как Linux и macOS.
\r\n — это комбинация символов (Carriage Return + Line Feed), используемая в Windows для обозначения новой строки.
*/