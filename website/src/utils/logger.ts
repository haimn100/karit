const warn = (msg: string, obj?: any) => {
    if (obj) console.warn(msg, obj);
    else console.warn(msg)
}

const info = (msg: string, obj?: any) => {
    if (obj) console.info(msg, obj);
    else console.info(msg)
}

const error = (msg: string, obj?: any) => {
    if (obj) console.error(msg, obj);
    else console.error(msg)
}


export default {
    info,
    warn,
    error
}