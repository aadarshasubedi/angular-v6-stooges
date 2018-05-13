export function createAndAppendScript(src: string, id? : string): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = src;
    if(id) script.id = id;
    document.getElementsByTagName('head')[0].appendChild(script);
}