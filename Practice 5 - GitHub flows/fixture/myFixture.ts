import {test as baseTest} from "@playwright/test";

type myData = {
    URL : string,
}

const myFixtureTest = baseTest.extend<myData>({
    URL : 'https://github.com/',
})

export const myTest = myFixtureTest;