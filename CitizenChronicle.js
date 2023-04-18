let people = [] // array to store people
const init = () => {
    people[0] = new getPerson("John", "Doe", "123456789", "New York", "14/10/1999", "")
    people[1] = new getPerson("Alice", "Smith", "987654321", "Los Angeles", "14/02/1985", "123456789")
    people[2] = new getPerson("Bob", "Johnson", "456123789", "Chicago", "10/05/1978", "")
    people[3] = new getPerson("Jane", "Doe", "321654987", "Houston", "27/11/2000", "123456789")
    people[4] = new getPerson("Mike", "Williams", "654987321", "San Francisco", "12/08/1995", "")
    people[5] = new getPerson("Emily", "Davis", "987654123", "Miami", "23/04/1987", "456123789")
    people[6] = new getPerson("David", "Lee", "321789654", "Boston", "30/09/1975", "")
    people[7] = new getPerson("Sarah", "Taylor", "456789123", "Dallas", "18/06/1992", "321789654")
    people[8] = new getPerson("Tom", "Brown", "789321456", "Seattle", "05/12/1982", "")
    people[9] = new getPerson("Olivia", "Wilson", "789456123", "Washington", "15/03/2001", "789321456")
    people[10] = new getPerson("John", "Doe", "123123119", "New York", "14/03/2023", "321654987")
}

function menu() {
    while (true) {
        choice = prompt(`
╔═══╗╔╗───────────╔═══╦╗─────────────╔╗
║╔═╗╠╝╚╗──────────║╔═╗║║─────────────║║
║║─╚╬╗╔╬╦═══╦══╦═╗║║─╚╣╚═╦═╦══╦═╗╔╦══╣║╔══╗
║║─╔╬╣║╠╬══║║║═╣╔╗╣║─╔╣╔╗║╔╣╔╗║╔╗╬╣╔═╣║║║═╣
║╚═╝║║╚╣║║══╣║═╣║║║╚═╝║║║║║║╚╝║║║║║╚═╣╚╣║═╣
╚═══╩╩═╩╩═══╩══╩╝╚╩═══╩╝╚╩╝╚══╩╝╚╩╩══╩═╩══╝
        ░░░░░░░┼█┼░░░░░╬█╬░░░░░─█─░░░░░░░
        ░░░░░░░█─█░░░░░█═█░░░░░█─█░░░░░░░
        ░░░░░░░░█░░░░░░░█░░░░░░░█░░░░░░░░
        ░░░░░███████░███████░███████░░░░░
        ░░░░░░░░█░░░░░░░█░░░░░░░█░░░░░░░░
        ░░░░░░░███░░░░░███░░░░░███░░░░░░░
        ░░░░░░██░██░░░██░██░░░██░██░░░░░░
        Welcome to the CitizenChronicle,
        Please choose an option:
        1. Add a person
        2. Delete a person
        3. Edit details
        4. Print person
        5. Search for a person
        6. cuts, queries & reports
        7. Exit
    `);

        switch (choice) {
            case "1":
                addPerson();
                break;
            case "2":
                alert(deletePerson(prompt("The ID")));
                break;
            case "3":
                edit(dbMatcher(prompt("The ID"), "id"));
                break;
            case "4":
                printPerson(prompt("The ID"));
                break;
            case "5":
                search();
                break;
            case "6":
                cutsQueriesAndReports();
                break;
            case "7":
                let confirmExit = confirm("Are you sure you want to exit?");
                if (confirmExit) {
                    alert("Goodbye!");
                    return;
                }
                break;
            default:
                alert("Invalid choice. Please choose again.");
        }
    }
}

function getPerson(firstName, lastName, id, city, dob, parentId) {
    return {
        firstName,
        lastName,
        id,
        age: function () {
            const [birthDay, birthMonth, birthYear] = this.dob.split('/').map(Number);
            const now = new Date();
            const currentDay = now.getUTCDate();
            const currentMonth = now.getUTCMonth() + 1;
            const currentYear = now.getUTCFullYear();

            let daysDiff = currentDay - birthDay;
            let monthsDiff = currentMonth - birthMonth;
            let yearsDiff = currentYear - birthYear;

            if (daysDiff < 0) {
                daysDiff += new Date(currentYear, currentMonth - 1, 0).getDate();
                monthsDiff--;
            }

            if (monthsDiff < 0) {
                monthsDiff += 12;
                yearsDiff--;
            }

            return `${yearsDiff} years, ${monthsDiff} months, and ${daysDiff} days old.`;

        },
        city,
        dob,
        parentId,
    };
}

function addPerson() {
    let firstName = validate(prompt("Enter first name:"), "name"),
        lastName = validate(prompt("Enter last name:"), "name"),
        id = validate(prompt("Enter ID:"), "id"),
        city = validate(prompt("Enter city:"), "name"),
        dob = validate(prompt("Enter date of birth (DD/MM/YYYY):"), "dob"),
        parentId = validate(prompt("Enter parent's ID (optional):"), "parentId");
    parentId = notSameParentId(parentId, id);
    people.push(getPerson(firstName, lastName, id, city, dob, parentId));
    alert("The person has been added successfully");
    return;
}

function validate(value, type) {
    let errorMessage, regex, currentDay, currentMonth, currentYear;
    switch (type) {
        case "name":
            regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
            errorMessage = "Invalid name. Please enter a valid name:";
            break;
        case "parentId":
            if (value == "") return value;
        case "id":
            regex = /^[0-9]{9}$/;
            errorMessage = "Invalid ID card number. Please enter a valid 9-digit number:";
            break;
        case "dob":
            regex = /^(?:(?:31\/(?:0?[13578]|1[02]))\/|(?:(?:29|30)\/(?:0?[13-9]|1[0-2])\/))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29\/0?2\/(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)))$|^(?:0?[1-9]|1\d|2[0-8])\/(?:0?[1-9]|1[0-2])\/(?:(?:1[6-9]|[2-9]\d)\d{2})$/;
            errorMessage = "Invalid date format. Please enter a date in the format DD/MM/YYYY:";
            let = [day, month, year] = value.split('/');
            currentDay = new Date().getUTCDate();
            currentMonth = new Date().getUTCMonth() + 1;
            currentYear = new Date().getUTCFullYear();
            break;
        case "age":
            regex = /^(1[0-9]{1,2}|[1-9][0-9]|[1-9])$/;
            errorMessage = "Invalid age. Please enter a age between 1 and 120:";
            break;
    }

    while (true) {
        if (!regex.test(value)) {
            value = prompt(errorMessage);
        }
        else if (type === "id" && dbMatcher(value, type).length > 0) {
            value = prompt("The id already exist. Please enter a different ID:");
        }
        else if (type === "dob" && (year > currentYear || (month > currentMonth && year == currentYear) || (day > currentDay && month == currentMonth && year == currentYear))) {
            value = prompt("Invalid date. Please enter a date in the past:");
            [day, month, year] = value.split('/');
        }
        else { break; }
    }
    if (type == "name") value = value.split(" ").map(str => str[0].toUpperCase() + str.slice(1)).toString(" ");
    return value;
}

function notSameParentId(parent, child) {
    while (parent == child) {
        parent = validate(prompt("Enter a different parent ID:"), "parentId");
    }
    return parent;
}

function dbMatcher(valueSearch, key, partialSearch = false) {
    // Returns the index where the value is found
    let findings = people.flatMap((person, index) => {
        if (partialSearch && people[index][key].includes(valueSearch)) return index;
        else if (people[index][key] === valueSearch) return index;
        else return [];
    })
    return findings;
}

function deletePerson(idNumber) {
    const descendants = dbMatcher(idNumber, "parentId");
    for (const descendantIndex of descendants) deletePerson(people[descendantIndex].id);  // descendants
    const parentIndex = people.findIndex((person) => person && person.id === idNumber);
    delete people[parentIndex];
    people = people.filter(Boolean); // remove empty slots
    return descendants.length ? "The deletion was successful" : "The ID was not found";
}

function edit(personIndex) {
    while (personIndex.length == 0) {
        personIndex = dbMatcher(prompt("The id isn't exist. Please enter a different ID:"), "id")
    }
    choice = prompt(`
    Please select your edit option:
    1. ID
    2. First name
    3. Last name
    4. City
    5. Parent's ID`)
    switch (choice) {
        case "1":
            people[personIndex].id = validate(prompt("Enter ID:"), "id");
            break;
        case "2":
            people[personIndex].firstName = validate(prompt("Enter first name:"), "name");
            break;
        case "3":
            people[personIndex].lastName = validate(prompt("Enter last name:"), "name");
            break;
        case "4":
            people[personIndex].city = validate(prompt("Enter city:"), "name");
            break;
        case "5":
            parent = validate(prompt("Enter parent's ID:"), "parentId");
            people[personIndex].parentId = notSameParentId(parent, people[personIndex].id);
            break;
        default:
            alert("Invalid choice. Please choose again.");
            return edit(personIndex);
    }
    alert("The changes have been saved");
    return;
}

function printPerson(id) {
    let personIndex = dbMatcher(id, "id");
    if (personIndex.length > 0) {
        flag = confirm("Would you like to see the children too?");
        if (flag) personIndex = personIndex.concat(showChildren(id));
    }
    alert(printTemplate(personIndex));
    return;
}

function printTemplate(peopleIndex, message = "") {
    for (index of peopleIndex) {
        message += `
Name: ${people[index].firstName}, ${people[index].lastName}
Age: ${people[index].age()}
Date of Birth: ${people[index].dob}
City: ${people[index].city}
ID Card: ${people[index].id}
${peopleIndex[peopleIndex.length - 1] != index ? "-".repeat(29) : ""}`;
    }
    return message === "" ? "No match was found." : message;
}

function search() {
    let choice = prompt(`
    Please select your search option:
    1. Text - first name or last name
    2. ID`)
    switch (choice) {
        case "1":
            text = prompt("Enter the name or part of it:");
            index = dbMatcher(text, "firstName", true).concat(dbMatcher(text, "lastName", true)).filter((v, i, arr) => !arr.includes(v, i + 1));
            break;
        case "2":
            idNumber = prompt("Enter ID:");
            index = (dbMatcher(idNumber, "id"));
            break;
        default:
            alert("Invalid choice. Please choose again.");
            return search();
    }
    alert(printTemplate(index));
    return;
}

function cutsQueriesAndReports() {
    let choice = prompt(`
    Please select the option you wish to view [1-4]:
    1. People over a certain age
    2. Children of a certain person
    3. Anyone who meets one of the following conditions:
        A. was born in an even month
        B. They have at least 2 children
        C. Their name or one of their children is a palindrome
    4. Presentation of all the cities and their inhabitants`)
    switch (choice) {
        case "1":
            let age = Number(validate(prompt("Enter the age:"), "age")),
                index = showPeopleOverAge(age);
            alert(printTemplate(index));
            break;
        case "2":
            let id = prompt("Enter ID:");
            alert(printTemplate(showChildren(id)));
            break;
        case "3":
            let palindromePeople = [];
            people.filter((person, personIndex) => {
                if (isPalindromeName(personIndex)) palindromePeople.push(personIndex);
                childIndex = showChildren(person.id);
                childIndex.forEach((child) => {
                    if (isPalindromeName(child)) palindromePeople.push(personIndex);
                });
            });
            alert(printTemplate(bornInEvenMonth().concat(hasAtLeastTwoChildren(), palindromePeople).filter((value, index, self) => self.indexOf(value) === index)));
            break;
        case "4":
            alert(showCitiesAndCitizens());
            break;
        default:
            alert("Invalid choice. Please choose again.");
            return cutsQueriesAndReports();
    }
}
function bornInEvenMonth() {
    let evenMonthPeople = [];
    people.forEach((person, index) => { if (person.dob.split("/", 2)[1] % 2 === 0) evenMonthPeople.push(index); });
    return evenMonthPeople;
}

function isPalindromeText(text) {
    if (text == text.toLowerCase().split('').reverse().join('')) {
        return true;
    }
    return false;
}

function isPalindromeName(idIndex) {
    if (isPalindromeText(people[idIndex].firstName) && isPalindromeText(people[idIndex].lastName)) {
        return true;
    }
    return false;
}

function hasAtLeastTwoChildren() {
    let parents = people.flatMap((person, index) => { return showChildren(person.id).length >= 2 ? index : [] })
    return parents;
}

function showChildren(idNumber) {
    childrenIndex = dbMatcher(idNumber, "parentId");
    return childrenIndex;
}

function showPeopleOverAge(personAge) {
    let arrayOfIndexes = [];
    people.forEach((person, index) => { if (Number(person.age()) >= personAge) arrayOfIndexes.push(index) });
    return arrayOfIndexes;
}

function showCitiesAndCitizens() {
    // Take all cities
    let allCitiesName = people.flatMap(person => person.city),
        // Remove duplicates cities
        citiesList = allCitiesName.filter((city, index, cities) => !cities.includes(city, index + 1)),
        citiesAndCitizens = "",
        citizens = [];
    citiesList.forEach(city => {
        citizens = dbMatcher(city, "city");
        citiesAndCitizens += printTemplate(citizens, `\n----${city}----\n`);
    })
    return citiesAndCitizens;
}

init();
menu();

