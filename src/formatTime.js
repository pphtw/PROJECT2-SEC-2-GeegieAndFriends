const formatTime = (time) =>{
    if (!time) return '0:00';

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${seconds}`
}
export default formatTime;