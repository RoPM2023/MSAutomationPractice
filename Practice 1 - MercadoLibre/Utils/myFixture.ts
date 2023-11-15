import {test as myTest} from "@playwright/test";

type myData = {
    myProductTitle : string,
    myProductSearch : string
}

const myFixtureTest = myTest.extend<myData>({
    myProductTitle : "Sandalia Vizzano Mujer Taco Bajo Tiras Cruzadas Comodas.",
    myProductSearch : "Sandalias"
})

export const customTest = myFixtureTest;
//////////////