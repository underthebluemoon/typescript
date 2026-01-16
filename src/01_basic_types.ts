// 타입 정의 방법
let num: number = 1;
let str: string = '1';

// number (정수형) 타입
let deciaml: number = 6;
let hex: number = 0xf00d;
let nan: number = NaN;
let infinity: number = Infinity;
let bigint: bigint = 100n;  // (ES2020+) 지원

// string 문자열 타입
let color: string = 'red';

// literal 리터럴 타입 : 사용 빈도 낮음
let numLiteral: 1 = 1;
let strLiteral: 'a' = 'a';

// boolean(불리언) 타입
let bool: boolean = true;

// Array(배열) 타입
// 배열 요소 타입([]) 방식
let numList: number[] = [1, 2, 3];
let strList: string[] = ['a', 'b', 'c'];
// 제너릭 방식
let numList2: Array<number> = [1, 2, 3, 4, 5];
let dimensionalList: number[][] = [ [1, 2, 3], [5, 6, 7] ];
let multiList: (number | string)[] = [1, '2'];

// tuple(튜플) 타입
// 배열의 서브타입으로 크기와 타입이 고정된 배열
let x: [number, number] = [1, 1]
let x2: [number[], number] = [[1, 2],  1]

// object(객체) 타입
let obj1: object = {};
let obj2: object = [];
let obj3: object = function() {};
let obj4: object = new Date();
let obj5: object = { name:'1', age: 20};
// obj5.name;  -> 접근 안 됨
let obj6: {name: string, age: number};
obj6 = { name: '홍길동', age: 20};
obj6.name;

// optional(선택적) 프로퍼티: 프로퍼티명 뒤에 ?를 붙여서 설정
// readonly(읽기 전용) 프로퍼티: 프로퍼티명 앞에 `readonly` 키워드를 붙여서 설정
let obj7: { readonly name: string, age: number, gender?: string }
obj7 = { name: '홍길동', age: 20 };
obj7 = { name: '홍길동', age: 20, gender: 'M' };
// obj7.name = 'ttt';  -> 재할당 불가

// null & undefined 타입
// strict 모드 아닐 경우: 모든 타입에 할당 가능. 권장하지 않음.
// strict 모드 일 경우: 'any', 'unknown', null 에만 할당 가능
// let numNull: number = null; -> 할당 불가
let numNull: unknown = null;
let objNull: {name: string, age: number} | null | undefined = null;

// type alias: 사용자가 정의하는 타입(변수명의 첫글자는 대문자)
type User = {
    name: string, 
    age: number
};
const obj8 : User = { name: '홍길동', age: 20};
const obj9 : User = { name: '둘리', age: 50};

// Index Signature : 객체 타입을 유연하게 정의할 수 있도록 돕는 문법
type LangCodes = {
    KOREA: string,
    USA: string,
    JAPAN?: string,
}
type LangCode2 = {
    [key: string]: string;  
    KOREA: string, // 반드시 포함되어야 하는 프로퍼티인 경우 직접 명시
}
const langCodes: LangCode2 = {
    KOREA: 'kr',
    USA: 'en',
    CHINESE : 'ch',
}

// enum(열거형) 타입
// 여러 값들에 각각 이름과 특정 값을 부여해두고 사용하는 독립적인 타입
enum Role {
    // 값을 지정하지 않으면 정의한 순서대로 0~ index 자동 할당
    USER,
    GUEST,
    ADMIN,
}
const user1 = {
    name: '홍길동',
    role: Role.ADMIN
}
const user2 = {
    name: '둘리',
    role: Role.GUEST
}

// 값을 별도의 고정값으로 지정해서도 사용 가능
enum Role2 {
    USER = 'USER',
    GUEST= 'GUEST',
    ADMIN= 'ADMIN',
}
const uer3 = {
    name: '또치',
    role: Role2.ADMIN,
}

// any 타입 : 모든 타입 허용. 사용 지양
//        TypeScript의 엄격한 검사를 끄는 것과 같음  
let anyVal: any  = 1;

// unknown 타입 : 모든 타입 허용, 어떤 타입인지 모르기 때문에 함부로 연산 불가
let val1: any = 10;
let val2: unknown = 10;
// val1.length; -> 에러는 없지만 실행하면 터짐
// val2.length;  -> .length 사용 불가. 값 확인 전엔 쓸 수 없음

// 타입을 좁히기(Type Narrowing)위해 typeof, 비교문 등을 활용
if(typeof val2 === 'string') {
    val2.length;
}

// void 타입 : 'undefined'만 할당 가능, 리턴 타입이 없는 함수에서 리턴 타입으로 사용
function test(): void {
    console.log('test!!!');
}
test()

// algebraic type : union, intersection
// union : 합집합, 복수의 타입을 허용하고 싶을때, `|`를 통해 타입을 구분
// 주의 사항 : 시점에 따라서 사용 범위가 달라진다
//        1. 할당 시점 : `A | B`의 필수 프로퍼티를 모두 가지고 있거나, `A | B`의 모든 프로퍼티를 가지고 있으면 타입 검사 통과
//        2. 사용 시점 : `A | B`가 공통적으로 가진 프로퍼티만 사용 가능
let unionNumeric : number | string;
unionNumeric = 1;

// union 타입에서의 객체
type Human = {
    name: string,
    lang: string 
}
type Dog = {
    name: string,
    age: number 
}
type Animal = Human | Dog;  // Ainial type 
let test1: Animal = {
    name: '홍길동',
    lang: 'ko'
}
let tset2: Animal = {
    name: '둘리',
    age: 40 
}
let test3: Animal = {
    name: '또치',
    age: 5,
    lang: 'ko', 
}
test3.name;
// test3.age;
if('age' in test3) {
    test3.age;
}
// test3.lang;
// let test4: Animal = {
//     name: '도우너',
// } -> Human / Dog 양쪽 다 미달

// intersection : 교집합

