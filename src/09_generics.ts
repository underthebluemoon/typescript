// -------------------------------------------------------------------
// Generics

// 제네릭 함수
function fncNormal(val: any) {
    return val;
}
let num1 = fncNormal(10);
num1.toUpperCase();  // 오류 감지 못함 (실제로는 number, typescript상 any)

// 제네릭스 이용해서 함수로 만들 경우
function fncGeneric<T>(val: T):T {
    return val;
}
let num2 = fncGeneric(10);
// num2.toUpperCase();  // 오류 감지 (val의 타입 추론 가능)

// -------------------------------------------------------------------
// 제네릭스 인터페이스
interface DropBox1<T> {
    val: Text,
    selected: boolean;
}
const dropBox1: DropBox1<string> = { val: '1', selectd: false };

interface DropBox2<T, U> {
    val: T;
    selected: U;
}
const dropBox2: DropBox2<number, boolean> = { val: 1, selected: true };

// -------------------------------------------------------------------
// 클래스에서의 제네릭
class BoxNormal {
    public kinds: string[] = [];
    public add(val: string): void {
        this.kinds.push(val);
    } 
    public toString(): string {
        return this.kinds.toString();
    }
}
const boxNormal: BoxNormal = new BoxNormal();
boxNormal.add('test');
// boxNormal.add(1);  // Error

// 클래스에서의 제네릭
class BoxGerneric<T> {
    public kinds: T[] = [];
    public add(val: T): void {
        this.kinds.push(val);
    } 
    public toString(): string {
        return this.kinds.toString();
    }
}
const boxGeneric: BoxGerneric<number> = new BoxGerneric<number>();
boxGeneric.add(1);
const boxGeneric2: BoxGerneric<string> = new BoxGerneric<string>();
boxGeneric2.add('1');

// -------------------------------------------------------------------
// 제네릭 제약조건 : 제네릭에서 특정 조건을 만족하는 타입만 받도록 제한
interface RquiredLength {
    length: number;
}

function getLength<T extends RequiredLength>(arg: T): number {
    return arg.length;
}
getLength([]);
// getLength(1); // Error
