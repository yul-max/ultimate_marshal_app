export const end_date = (start_date, duration) => {
    const times = duration.split(":");
    let js_start_date = new Date(start_date.replace(' ', 'T'));
    js_start_date.setHours(js_start_date.getHours() + parseInt(times[0]));
    js_start_date.setMinutes(js_start_date.getMinutes() + parseInt(times[1]));
    js_start_date.setSeconds(js_start_date.getSeconds() + parseInt(times[2]));
    return js_start_date.toISOString().replace('T', ' ');
};