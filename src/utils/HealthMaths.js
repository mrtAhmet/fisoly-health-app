export const calculateStandartBMI = (weight, height) => {
    if (!weight || !height || height <= 0) return 0;

    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    return bmi.toFixed(1);
};

export const calculateStandartWater = (weight) => {

    const w = parseFloat(weight);

    if (!w || w <= 0) return "0";

    const waterAmount = (w * 35) / 1000;

    return waterAmount.toFixed(1);
}

export const calculateAdvancedBMI = (data) => {
    const { weight, height, age, gender, activity } = data;

    // 1. Temel VKİ
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    // 2. BMR [Bazal Metabolizma Hızı] (Mifflin-St Jeor Denklemi)
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);

    if (gender === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }

    // 3. TDEE (Aktiviteye Göre Toplam Kalori)
    const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        extra_active: 1.9
    };

    const tdee = bmr * (activityFactors[activity] || 1.2);

    // 4. İdeal Kilo (Devine Formülü)
    // Erkek: 50 + 2.3 * (boy_inc - 60) | Kadın: 45.5 + 2.3 * (boy_inc - 60)

    const heightInInches = height / 2.54;

    let baseIdealWeight;

    if (gender === 'male') {
        baseIdealWeight = 50 + 2.3 * (heightInInches - 60);
    } else {
        baseIdealWeight = 45.5 + 2.3 * (heightInInches - 60);
    }

    // Aktivite seviyesine göre ideal kilo toleransı ekleyelim
    // Spor yapan birinin daha fazla kas kütlesine sahip olabileceğini varsayıyoruz
    const activityBonus = {
        sedentary: 1.0,    // Değişiklik yok
        light: 1.02,       // %2 daha fazla ağırlık payı
        moderate: 1.05,    // %5 daha fazla ağırlık payı (kas kütlesi için)
        active: 1.1,       // %10 daha fazla ağırlık payı
        extra_active: 1.15 // %15 daha fazla ağırlık payı
    };

    const adjustedIdealWeight = baseIdealWeight * (activityBonus[activity] || 1.0);

    return {
        bmi,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        idealWeight: Math.round(adjustedIdealWeight)
    };

}

/**
 * Günlük Su İhtiyacı Hesaplama
 * @param {Object} data - { weight, activity, weather }
 * @returns {Object} - { ml, liters, glasses }
 */

export const calculateAdvancedWater = (data) => {
    const { weight, activity, weather } = data;

    // 1. Temel algoritma: Kilo başına 35ml
    let baseWater = weight * 35;

    // 2. Aktivite eklemesi: Terleme ile kaybedilen sıvı
    const activityBonus = {
        sedentary: 0,
        light: 350,
        moderate: 700,
        active: 1000,
        extra_active: 1500
    };

    // 3. Hava durumu/Sıcaklık eklemesi
    const weatherBonus = {
        cold: 0,
        normal: 300,
        hot: 700
    };

    const totalML = baseWater + (activityBonus[activity] || 0) + (weatherBonus[weather] || 0);
    const glasses = Math.round(totalML / 250); // 250ml'lik standart bardak

    return {
        ml: totalML,
        liters: (totalML / 1000).toFixed(1),
        glasses: glasses
    };
};