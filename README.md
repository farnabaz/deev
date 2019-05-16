Abstract Web Framework 

# Installation
- Install `deev` in your project
```
yarn add deev
# or 
npm i deev
```
- Create `deev.config.ts` in your projects root
```ts
export default {

}
```
- Next thing you need a your controllers, create `controllers` directory in project root and create your first Controller
```ts
/*
 * File: controllers/HelloController.ts
 **/
import { Route, Controller } from "deev";

export default class HelloController extends Controller {

    @Route.get("/hello/{name}")
    async sayHello(@Route.param("name") name: string) {
        return `Hello ${name}`;
    }

}
```