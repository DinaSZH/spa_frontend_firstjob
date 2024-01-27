export const monthsInRussian = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

export const monthsInRussian2 = [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];

export function getAgeFromBirthday(b) {
    const birthday = new Date(b)
    

    let age = 0;

    age = new Date().getTime() - birthday.getTime();

    age = parseInt(age / (1000 * 60 * 60 * 24 * 365));
    
    return age;
}