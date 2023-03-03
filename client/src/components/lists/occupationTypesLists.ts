/* eslint-disable no-array-constructor */
export const serviceTypes = [
    'Изготовление сосудов и аппаратов работающих под давлением',//0
    'Поставка трубного проката',//1
    'Поставка листового проката',//2
    'Поставка сортового проката',//3
    'Поставка поковок',//4
    'Поставка днищ',//5
    'Поставка линзовых компенсаторов',//6
    'Поставка фланцев и/или фланцевых заготовок',//7
    'Поставка крепежных элементов',//8
    'Поставка обечаек',//9
    'Поставка гнутых труб и/или змеевиков',//10
    'Поставка отводов, переходов',//11
    'Поставка сварочных материалов',//12
    'Предоставление лицензий по переработке углеводородного сырья',//13
    'Предоставление займов и/или кредитов юридическим лицам',//14
    'Проектирование химического оборудования',//15
    'Проектирование промышленных объектов с использованием химического оборудования',//16
    'Строительно-монтажные работы на промышленных объектах',//17
    'Транспортные услуги',//18
    'Услуги генерального подрядчика',//19
    'Услуги лицензирования',//20
    'Услуги по механической обработке металла',//21
    'Услуги неразрушающих и разрушающих методов контроля',//22
    'Услуги обследования работающего оборудования',//23
    'Услуги проведения аудита предприятия',//24
    'Услуги по аттестации технологий сварки',//25
    'Услуги по аттестации технологий развальцовки',//26
    'Услуги по контролю качества изготовления оборудования',//27
    'Услуги по окраске изделий',//28
    'Услуги по резке и гибке листового металлапоката',//29
    'Услуги сертификации',//30
    'Услуги по термической обработке'//31
]


export const equipmentUnderPressure = [
    "Перечень оборудования производимого на предприятии",
    "Заготовительное производство",
    "Услуги по механической обработке металла",
    "Развальцовка",
    "Сварка",
    "Термическая обработка",
    " Испытания ",
    "Окраска поверхностей ",
    "Разработка РКД",
    "Система технологического контроля",
    "Лаборатория контроля качества  ",
    "Комплектующие(Гнутые трубы, Днища, Крепеж)",
    "Разрешительная документация"
]

export const pipeSupply = [
    'Поставка трубного проката'
]

export const sheetMetalSupply = [
    'Поставка листового проката'
]

// массив отключенных к выбору форм в "Профиль деятельности предприятия"
export const disabledCheck = [
    false, false, false, false, false, false, false, false, false, true, false, false, false, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, false, false, false, false
]

export const companyListExcludeDisabled = [
    'Изготовление сосудов и аппаратов работающих под давлением',//0
    'Поставка поковок',//4
    'Поставка днищ',//5
    'Поставка линзовых компенсаторов',//6
    'Поставка фланцев и/или фланцевых заготовок',//7
    'Поставка крепежных элементов',//8
    'Поставка обечаек',//9
    'Поставка гнутых труб и/или змеевиков',//10
    'Поставка отводов, переходов',//11
    'Проектирование химического оборудования',//15
    'Услуги по механической обработке металла',//21
    'Услуги по окраске изделий',//28
    'Услуги по резке и гибке листового металлапоката',//29
    'Услуги сертификации',//30
    'Услуги по термической обработке'//31
]


export const individualForms = [ 'Four', 'Ten', 'Sixteen', 'Seventeen', 'FormBendPipe', 'FormBottoms', 'FormLensCompensators', 'FormFlanges', 'FormForgings', 'FormBends', 'FormHardware', 'FormRolling', 'FormProductColoration', 'FormBendingCuttingMetal', 'FormHeatTreatment', 'FormWelding', 'FormRolled', 'FormPipesSupply', 'FormSheetMetalSupply']

export const fullInfo = [{
    id: 0,
    name: "Main",
    title: "Контактная информация",
},
   
{
    id: 18,
    name: "Zero",
    title: "Перечень оборудования",

},
{
    id: 4,
    name: "Four",
    title: "Материалы",
},
{
    id: 1,
    name: "One",
    title: "Заготовительное производство",
},
{
    id: 2,
    name: "Two",
    title: "Услуги по механической обработке металла",

},
{
    id: 7,
    name: "Seven",
    title: "Развальцовка",

},
{
    id: 8,
    name: "Eight",
    title: "Комплектующие(Гнутые трубы, Днища, Крепеж)",

},
{
    id: 3,
    name: "Three",
    title: "Сварка",

},
{
    id: 5,
    name: "Five",
    title: "Термическая обработка",

},
{
    id: 9,
    name: "Nine",
    title: "Испытания",

},
{
    id: 6,
    name: "Six",
    title: "Окраска поверхностей",

},
{
    id: 10,
    name: "Ten",
    title: "Грузоподъемное оборудование",

},
{
    id: 11,
    name: "Eleven",
    title: "Разработка РКД",

},
{
    id: 12,
    name: "Twelve",
    title: "Система технологического контроля",

},
{
    id: 13,
    name: "Thirteen",
    title: "Лаборатория контроля качества",

},
{
    id: 16,
    name: "Sixteen",
    title: "Грузоперевозки",

},
{
    id: 14,
    name: "Fourteen",
    title: "Разрешительная документация",

},
{
    id: 15,
    name: "Fifteen",
    title: "Квалификация поставщика",

},
{
    id: 17,
    name: "Seventeen",
    title: "Текущее состояние предприятия",

},
// {
//     id: 19,
//     name: "Production",
//     title: "Профиль деятельности",

// },
{
    id: 20,
    name: "FormBendPipe",
    title: "Поставка гнутых труб и змеевиков",

},
{
    id: 21,
    name: "FormBottoms",
    title: "Поставка днищ",

},
{
    id: 22,
    name: "FormLensCompensators",
    title: "Поставка линзовых компенсаторов",

},
{
    id: 23,
    name: "FormFlanges",
    title: "Поставка фланцев и/или фланцевых заготовок",

},
{
    id: 24,
    name: "FormForgings",
    title: "Поставка поковок",

},
{
    id: 25,
    name: "FormBends",
    title: "Поставка отводов, переходов, тройников",

},
{
    id: 26,
    name: "FormHardware",
    title: "Метизы",

},
{
    id: 27,
    name: "FormRolling",
    title: "Вальцовка",

},
{
    id: 28,
    name: "FormProductColoration",
    title: "Услуги по окраске изделий",

},
{
    id: 29,
    name: "FormBendingCuttingMetal",
    title: "Услуги по резке и гибке металла",

},
{
    id: 30,
    name: "FormHeatTreatment",
    title: "Услуги по термической обработке",

},
{
    id: 31,
    name: "FormWelding",
    title: "Поставка сварочных материалов",

},
{
    id: 32,
    name: "FormRolled",
    title: "Поставка сортового проката",

},
{
    id: 33,
    name: "FormPipesSupply",
    title: "Поставка трубного проката",

},
{
    id: 34,
    name: "FormSheetMetalSupply",
    title: "Поставка листового проката",

},
{
    id: 35,
    name: "EconomicData",
    title: "Экономическая информация",

}
]


export const occupationTypes = [
    'Сосуды и аппараты работающие под давлением',//0
    'Трубный прокат',//1
    'Листовой прокат',//2
    'Сортовой прокат',//3
    'Поковки',//4
    'Днища',//5
    'Линзовые компенсаторы',//6
    'Фланцы и/или фланцевые заготовоки',//7
    'Крепежные элементы',//8
    'Обечайки',//9
    'Гнутые трубы и/или змеевики',//10
    'Отводы, переходы',//11
    'Сварочные материалы',//12
    'Лицензии по переработке углеводородного сырья',//13
    'Займы и/или кредты юридическим лицам',//14
    'Проектирование химического оборудования',//15
    'Проектирование промышленных объектов с использованием химического оборудования',//16
    'Строительно-монтажные работы на промышленных объектах',//17
    'Транспортные услуги',//18
    'Услуги генерального подрядчика',//19
    'Лицензирование',//20
    'Механическая обработка металла',//21
    'Неразрушающие и разрушающие методы контроля',//22
    'Обследование работающего оборудования',//23
    'Проведение аудита предприятия',//24
    'Вальцовка',//25
    'Аттестация технологий развальцовки',//26
    'Контроль качества изготовления оборудования',//27
    'Окраска изделий',//28
    'Резка и гибка листового металлапоката',//29
    'Сертификация',//30
    'Термическая обработка',//31
    'Аттестация технологий сварки',//32
];


export const chemicalEquipmentManufacturing = ['Zero', 'One', 'Two', 'Seven', 'Three', 'Five', 'Nine', 'Six', 'Eleven', 'Twelve', 'Thirteen', 'Eight', 'Fourteen'];
const forgings = ['FormForgings'];
const bottoms = ['FormBottoms'] //поставка днищ
const lensCompensators = ['FormLensCompensators'] //линзовые компенсаторы
const flanges = ['FormFlanges'];
// const servicesForCuttingAndBendingSheetMetal = ['Four'];
const metalMachiningServices = ['Two']; //механическая обработка
const FormEight = ['Eight'] // todo: обечайки Необходимо сделать отдельную форму для обечаек
const FormBendPipe = ['FormBendPipe']; //поставка гнутых труб и змеевиков
const FormBends = ['FormBends']; //Поставка отводов, переходов
const FormHardware = ['FormHardware']; //метизы
const FormRolling = ['FormRolling'];//вальцовка
const FormProductColoration = ['FormProductColoration'];//окраска изделий
const FormBendingCuttingMetal = ['FormBendingCuttingMetal'];//услуги по гибке и резке листового металла
const FormWelding = ['FormWelding']; //Поставка сварочных материалов
const FormHeatTreatment = ['FormHeatTreatment']//услуги по термической обработке листового металла
const FormRolled = ['FormRolled']//поставка сортового проката
const FormPipesSupply = ['FormPipesSupply']//поставка трубного проката
const FormSheetMetalSupply = ['FormSheetMetalSupply'] //поставка листового проката
export const allFormsNames = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Zero', 'FormBendPipe', 'FormBottoms', 'FormLensCompensators', 'FormFlanges', 'FormForgings', 'FormBends', 'FormHardware', 'FormRolling', 'FormProductColoration', 'FormBendingCuttingMetal', 'FormHeatTreatment', 'FormWelding', 'FormRolled', 'FormPipesSupply', 'FormSheetMetalSupply']


export const FORM_ = new Array(
    chemicalEquipmentManufacturing, //0
    FormPipesSupply,//1
    FormSheetMetalSupply, //2
    FormRolled,//3
    forgings,//4
    bottoms,//5
    lensCompensators,//6
    flanges,//7
    FormHardware, //8
    FormEight,//9 //todo: обечайки - необходимо сделать отдельную форму
    FormBendPipe,//10
    FormBends, //11
    FormWelding,//12
    ['Main'],//13
    ['Main'],//14
    ['Main'],//15
    ['Main'],//16
    ['Main'],//17
    ['Main'],//18
    ['Main'],//19
    ['Main'],//20
    metalMachiningServices, //21
    ['Main'],//22
    ['Main'],//23
    ['Main'],//24
    ['Main'],//25
    FormRolling,//26
    ['Main'],
    FormProductColoration,
    FormBendingCuttingMetal,
    allFormsNames,
    FormHeatTreatment
);


export const equip = ['Емкости без внутренних устройств', 'Емкости с внутренними устройствами', 'Емкости с перемешивающими устройствами', 'Емкости для хранения', 'Рулонированные сосуды', 'Шаровые резервуары', 'Кожухотрубное теплообменное оборудование']

