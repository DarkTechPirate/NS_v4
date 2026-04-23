const TAMIL_NADU_LOCATION_MAP = {
    Ariyalur: ["Ariyalur", "Jayankondam", "Sendurai", "Udayarpalayam"],
    Chengalpattu: ["Chengalpattu", "Tambaram", "Pallavaram", "Maraimalai Nagar", "Madurantakam", "Kelambakkam"],
    Chennai: ["T Nagar", "Adyar", "Anna Nagar", "Velachery", "Porur", "Mylapore", "Nungambakkam", "Perambur"],
    Coimbatore: ["Coimbatore", "Mettupalayam", "Pollachi", "Sulur", "Valparai"],
    Cuddalore: ["Cuddalore", "Chidambaram", "Panruti", "Neyveli", "Virudhachalam"],
    Dharmapuri: ["Dharmapuri", "Harur", "Palacode", "Pennagaram"],
    Dindigul: ["Dindigul", "Palani", "Kodaikanal", "Oddanchatram", "Vedasandur"],
    Erode: ["Erode", "Gobichettipalayam", "Bhavani", "Perundurai", "Sathyamangalam"],
    Kallakurichi: ["Kallakurichi", "Sankarapuram", "Chinnasalem", "Ulundurpet"],
    Kancheepuram: ["Kancheepuram", "Sriperumbudur", "Uthiramerur", "Kundrathur"],
    Kanyakumari: ["Nagercoil", "Kanyakumari", "Marthandam", "Colachel", "Kuzhithurai"],
    Karur: ["Karur", "Kulithalai", "Aravakurichi", "Krishnarayapuram"],
    Krishnagiri: ["Krishnagiri", "Hosur", "Denkanikottai", "Uthangarai"],
    Madurai: ["Madurai", "Melur", "Usilampatti", "Thiruparankundram", "Vadipatti"],
    Mayiladuthurai: ["Mayiladuthurai", "Sirkazhi", "Kuthalam", "Tharangambadi"],
    Nagapattinam: ["Nagapattinam", "Velankanni", "Kilvelur", "Vedaranyam"],
    Namakkal: ["Namakkal", "Rasipuram", "Tiruchengode", "Paramathi Velur"],
    Nilgiris: ["Udhagamandalam", "Coonoor", "Kotagiri", "Gudalur"],
    Perambalur: ["Perambalur", "Kunnam", "Veppanthattai", "Alathur"],
    Pudukkottai: ["Pudukkottai", "Aranthangi", "Alangudi", "Avudaiyarkoil", "Iluppur"],
    Ramanathapuram: ["Ramanathapuram", "Paramakudi", "Rameswaram", "Kamuthi", "Mudukulathur"],
    Ranipet: ["Ranipet", "Arakkonam", "Walajapet", "Sholinghur", "Arcot"],
    Salem: ["Salem", "Attur", "Mettur", "Edappadi", "Sankagiri"],
    Sivaganga: ["Sivaganga", "Karaikudi", "Devakottai", "Manamadurai", "Tirupathur"],
    Tenkasi: ["Tenkasi", "Courtallam", "Sankarankovil", "Shencottai", "Kadayanallur"],
    Thanjavur: ["Thanjavur", "Kumbakonam", "Pattukkottai", "Orathanadu", "Papanasam"],
    Theni: ["Theni", "Periyakulam", "Bodinayakanur", "Cumbum", "Uthamapalayam"],
    Thoothukudi: ["Thoothukudi", "Tiruchendur", "Kovilpatti", "Sathankulam", "Ettayapuram"],
    Tiruchirappalli: ["Tiruchirappalli", "Srirangam", "Thuraiyur", "Lalgudi", "Manapparai"],
    Tirunelveli: ["Tirunelveli", "Ambasamudram", "Nanguneri", "Palayamkottai", "Cheranmahadevi"],
    Tirupattur: ["Tirupattur", "Vaniyambadi", "Ambur", "Natrampalli"],
    Tiruppur: ["Tiruppur", "Avinashi", "Palladam", "Udumalaipettai", "Dharapuram"],
    Tiruvallur: ["Tiruvallur", "Avadi", "Ponneri", "Gummidipoondi", "Poonamallee"],
    Tiruvannamalai: ["Tiruvannamalai", "Arani", "Cheyyar", "Polur", "Vandavasi"],
    Tiruvarur: ["Tiruvarur", "Mannargudi", "Needamangalam", "Kodavasal", "Nannilam"],
    Vellore: ["Vellore", "Gudiyatham", "Katpadi", "Pernambut", "Anaicut"],
    Viluppuram: ["Viluppuram", "Tindivanam", "Gingee", "Kallakurichi Town", "Marakkanam"],
    Virudhunagar: ["Virudhunagar", "Sivakasi", "Rajapalayam", "Aruppukkottai", "Sattur", "Srivilliputhur"],
};

const TAMIL_NADU_DISTRICTS = Object.keys(TAMIL_NADU_LOCATION_MAP);

const ALL_TAMIL_NADU_LOCALITIES = TAMIL_NADU_DISTRICTS.flatMap((district) => {
    return TAMIL_NADU_LOCATION_MAP[district].map((locality) => ({
        district,
        locality,
        state: "Tamil Nadu",
        country: "India",
    }));
});

module.exports = {
    TAMIL_NADU_LOCATION_MAP,
    TAMIL_NADU_DISTRICTS,
    ALL_TAMIL_NADU_LOCALITIES,
};
