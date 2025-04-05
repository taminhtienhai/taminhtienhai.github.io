export const debounce_async = (timeout: number) => {
    let timer: number;
    return <Out>(action: () => Out) => new Promise<Out>((resolve, reject) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            try {
                resolve(action())
            } catch (error) {
                reject(error);                
            }
        }, timeout);
    })
};

export const delay = <Out>(action: () => Out, timeout: number = 1000) => {
    return new Promise<Out>((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(action())
            } catch (error) {
                reject(error);                
            }
        }, timeout);
    });
}


export const delay_val = <Out>(val: Out, timeout: number = 1000) => {
    return new Promise<Out>((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(val);
            } catch (error) {
                reject(error);                
            }
        }, timeout);
    });
}