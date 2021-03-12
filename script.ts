interface IBookData {
    has_fulltext: boolean,
    title: string,
    type: string,
    key: string,
    author_name: string[]
    language: string[]
}

// ok, needs to be done differently...
interface ISomeCoolInterface {
    myFirstParam?: string,
    mySecondParam: number
}

enum mySecondCoolEnum {
    second_val1 = 0,
    second_val2 = 1,
    second_val3 = 2
}

// this should still work though...
class coolTypeScriptSecondaryClass {
    static globalStaticVar: string = "static content"
    private privateVar: number = 1000
    public publicVar: string = "read me everywhere"
    private url: string = 'http://openlibrary.org/search.json?q='
    public outTableOptions = {}
    public myRecords = {}

    constructor(
        public publicProp: boolean = false
    ) {
        // inside comment
        // if i give it in constructor as public, it becomes global
        // nice shorthand...
        this.publicProp = true
        // console.log(myCoolEnum.val1)
        // console.log(myCoolEnum[myCoolEnum.val1])
    }

    protected set setPrivateProperty(val: number) {
        this.privateVar = val * 10000; // lets just add some...
    }

    protected get getPrivateProperty(): number {
        return this.privateVar;
    }

    public async fetchMeSomeStuff(url: string) { // not defining a return type yet, noimplicitany...
        const response = await fetch(url);
        const data = await response.json()
        const outMap = data.docs.map((data: IBookData) => { 
            return { // ok, lets go explicit
                has_fulltext: data.has_fulltext, 
                title: data.title, 
                type: data.type,
                key: data.key,
                author_name: data.author_name,
                language: data.language } as IBookData 
        }) // lets look if that works
        return (outMap ?? []);
    }

    public handleMe(val: string, doc: HTMLDocument) {
        this.fetchMeSomeStuff(this.url + val).then((resp) => {
            const headings = [
                "author",
                "title",
                "language"
            ]
            const oldTable = doc.body.querySelector('table') // xisting table
            const table = this.createDataTable(headings, resp) // new table
            if (oldTable)
                doc.body.querySelector(".table")?.removeChild(oldTable)
            doc.body.querySelector(".table")?.appendChild(table)
        })
    }

    // TODO: getting more generic would be good...
    public createDataTable(headings: string[] = [], data = []): HTMLElement {
        var tbl = document.createElement('table');
        tbl.style.width = '100%';
        tbl.setAttribute('border', '1');
        var thead = document.createElement('thead');
        var headRow = document.createElement('tr');
        headings.forEach((heading) => {
            let td = document.createElement('td');
            td.innerHTML = heading
            headRow.appendChild(td)
        })
        thead.appendChild(headRow)
        var tbdy = document.createElement('tbody');
        data.forEach((book: IBookData) => {
            let bRow = document.createElement('tr')
            let dAuthor = document.createElement('td')
            let dTitle = document.createElement('td')
            let dLanguage = document.createElement('td')
            if (book.author_name && book.author_name[0])
                dAuthor.innerHTML = book.author_name[0]
            if (book.title)    
                dTitle.innerHTML = book.title
            if (book.language && book.language[0])    
                dLanguage.innerHTML = book.language[0]
            bRow.appendChild(dAuthor)
            bRow.appendChild(dTitle)
            bRow.appendChild(dLanguage)
            tbdy.appendChild(bRow)
        })
        tbl.appendChild(thead)
        tbl.appendChild(tbdy);
        return tbl;
    }

    public loopMe(data: string[]) {
        for (let idx: number = 0; idx < data.length; idx++)
            console.log(data[idx])

        data.forEach((elem) => {
            console.log(elem)
        })

        data.flatMap((elem) => {
            console.log(elem)
        })

        data.map((elem) => {
            console.log(elem)
        })

        // creating a local copy we can empty on
        let cloneData = [...data] // another useful shorthand

        while (cloneData.length !== 0) {
            let elem = cloneData.shift() // first elem off
            console.log(elem)
        }

        do {
            let elem = data.pop() // splice will be next...
            console.log(elem)
            // console.log(data?.length) // if theres no data, dont try...
        } while (data.length !== 0)
    }
}

const mySecondaryClassNode = new coolTypeScriptSecondaryClass(true)

// static vars derived from classes need to be statically called
// console.log(coolTypeScriptClass.globalStaticVar)

let arrayOfStrings = [
    "string1",
    "string2",
    "string3"
]

let data = <ISomeCoolInterface> {
    myFirstParam: "some data",
    mySecondParam: 1000000000000
}

// myClassNode.loopMe(arrayOfStrings)
// myClassNode.main(data)

/*myClassNode.fetchMeSomeStuff(
    'http://openlibrary.org/search.json?q=illuminati'
    ).then((data) => {
        console.log(data)
    }
)*/

/*fetch("http://openlibrary.org/search.json?q=illuminati?limit=2", {
    method: "GET",
})
.then(res => {
    console.log(res.ok);
    console.log(res.status);
    console.log(res.statusText);
    console.log(res.headers.raw());
    console.log(res.headers.get('content-type'));
    return res;
}).then(json => { console.log(json) })*/

// Set up our HTTP request
/*var xhr = new XMLHttpRequest();

// Setup our listener to process compeleted requests
xhr.onreadystatechange = function () {

	// Only run if the request is complete
	if (xhr.readyState !== 4) return;

	// Process our return data
	if (xhr.status >= 200 && xhr.status < 300) {
		// What do when the request is successful
		console.log(JSON.parse(xhr.responseText));
	}

};

// Create and send a GET request
// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// The second argument is the endpoint URL
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.send();*/

/*fetch('https://api.github.com/users/github')
    .then(res => res.json())
    .then(json => console.log(json));*/

/*const button = document.querySelector("input[type='submit']");
let search = document.querySelector("input[type='text']"); // no framework... remember, no watchers...
button?.addEventListener(button, myClassNode.handleMe.bind(this));*/

let tableOptions;
let tableData;

document.querySelector("button")?.addEventListener("click", ((event) => {
    let q = "";
    event.preventDefault()
    console.log(q = (<HTMLInputElement>document.querySelector("input[type='text']"))?.value)
    mySecondaryClassNode.handleMe(q, document)
}));

/*myClassNode.fetchMeSomeStuff('http://openlibrary.org/search.json?q=illuminati').then((resp) => {
    console.log(resp)
})*/