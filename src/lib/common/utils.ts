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

export const delay_times_of = (contents: string[], speed: number = 50, initDelay = 0) => contents.entries().reduce((acc, [idx,item]) => {
    acc[idx] = (item.length * speed) + (acc[idx - 1] ?? initDelay) + 600;
    return acc;
}, Array.from<number>({ length: contents.length }))