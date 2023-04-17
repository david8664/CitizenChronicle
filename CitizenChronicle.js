let people = [] // array to store people
const init = () => {
    people[0] = new getPerson("John", "Doe", "123456789", "New York", "01/01/1990", "")
    people[1] = new getPerson("Alice", "Smith", "987654321", "Los Angeles", "14/02/1985", "123456789")
    people[2] = new getPerson("Bob", "Johnson", "456123789", "Chicago", "10/05/1978", "")
    people[3] = new getPerson("Jane", "Doe", "321654987", "Houston", "27/11/2000", "123456789")
    people[4] = new getPerson("Mike", "Williams", "654987321", "San Francisco", "12/08/1995", "")
    people[5] = new getPerson("Emily", "Davis", "987654123", "Miami", "23/04/1987", "456123789")
    people[6] = new getPerson("David", "Lee", "321789654", "Boston", "30/09/1975", "")
    people[7] = new getPerson("Sarah", "Taylor", "456789123", "Dallas", "18/06/1992", "321789654")
    people[8] = new getPerson("Tom", "Brown", "789321456", "Seattle", "05/12/1982", "")
    people[9] = new getPerson("Olivia", "Wilson", "789456123", "Washington", "15/03/2001", "789321456")
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
                deletePerson(prompt("The ID"));
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
            const [day, month, year] = this.dob.concat().split('/');
            const birthDateObj = new Date(year, month - 1, day);
            const ageDiffMs = Date.now() - birthDateObj.getTime();
            const ageDate = new Date(ageDiffMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        },
        city,
        dob,
        parentId,
    };
}

function addPerson() {
    let firstName = validateName(prompt("Enter first name:")),
        lastName = validateName(prompt("Enter last name:")),
        id = validateIDCard(prompt("Enter ID:")),
        city = validateName(prompt("Enter city:")),
        dob = validateDate(prompt("Enter date of birth (DD/MM/YYYY):")),
        parentId = validateIDCard(prompt("Enter parent's ID (optional):"), "parentId");
    parentId = checkingDifferentIds(parentId, id);
    people.push(getPerson(firstName, lastName, id, city, dob, parentId));
    alert("The person has been added successfully");
    return;
}

function checkingDifferentIds(parent, child) {
    while (parent == child) {
        parent = validateIDCard(prompt("It is not possible to insert the same ID into a private ID"));
    }
    return parent;
}

function validateIDCard(idNumber, belongs = "id") {
    if (idNumber == "" && belongs == "parentId") {
        return idNumber;
    }
    const idRegex = /^[0-9]{9}$/;
    while (!idRegex.test(idNumber)) {
        idNumber = prompt("Invalid ID card number. Please enter a valid 9-digit number:");
    }
    if (belongs == "parentId") {
        return idNumber;
    }
    else if (dbMatcher(idNumber, belongs).length > 0) {
        idNumber = prompt("The id already exist. Please enter a different ID:");
        return validateIDCard(idNumber, belongs);
    }
    return idNumber;
}

function validateDate(date) {
    const dateRegex = /^(?:(?:31\/(?:0?[13578]|1[02]))\/|(?:(?:29|30)\/(?:0?[13-9]|1[0-2])\/))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29\/0?2\/(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)))$|^(?:0?[1-9]|1\d|2[0-8])\/(?:0?[1-9]|1[0-2])\/(?:(?:1[6-9]|[2-9]\d)\d{2})$/;

    while (!dateRegex.test(date)) {
        date = prompt("Invalid date format. Please enter a date in the format DD/MM/YYYY:");
    }
    // Check if the entered date is in the past
    if (new Date(date) > new Date()) {
        date = prompt("Invalid date. Please enter a date in the past:");
        return validateDate(date);
    }
    return date;
}

function validateName(name) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    while (!nameRegex.test(name)) {
        name = prompt(`Invalid name. Please enter a valid name:`);
    }
    return name;
}

function validAge(age) {
    const ageRegex = /^(1[0-9]{1,2}|[1-9][0-9]|[1-9])$/;
    while (!ageRegex.test(age)) {
        age = prompt('Invalid age. Please enter a age between 1 and 120:');
    }
    return age;
}

function dbMatcher(value, key, partialSearch = false) {
    // Returns the index where the value is found
    findings = [];
    for (i in people) {
        if (partialSearch && people[i][key].includes(value)) {
            findings.push(i);
        }
        else if (people[i][key] === value) {
            findings.push(i);
        }
    }
    return findings;
}

function deletePerson(idNumber) { // delete grandfather
    children = dbMatcher(idNumber, "parentId");
    if (children.length > 0) {
        counter = 0;
        for (child in children) {
            children[child] = Number(children[child]) + counter; // Arranges the deletion places.
            people.splice(children[child], 1);
            counter--;
        }
    }
    parent = [].concat(people.findIndex((v, i) => v.id == idNumber));
    if (parent.length > 0) {
        people.splice(Number(parent[0]), 1);
    }
    if (parent.length + children.length > 0) {
        alert("The deletion was successful");
        return;
    }
    alert("The ID was not found");
    return;
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
            people[personIndex].id = validateIDCard(prompt("Enter ID:"));
            break;
        case "2":
            people[personIndex].firstName = validateName(prompt("Enter first name:"));
            break;
        case "3":
            people[personIndex].lastName = validateName(prompt("Enter last name:"));
            break;
        case "4":
            people[personIndex].city = validateName(prompt("Enter city:"));
            break;
        case "5":
            parent = validateIDCard(prompt("Enter parent's ID:"), "parentId");
            people[personIndex].parentId = checkingDifferentIds(parent, people[personIndex].id);
            break;
        default:
            alert("Invalid choice. Please choose again.");
            return edit(personIndex);
    }
    alert("The changes have been saved");
    return;
}

function printPerson(id) {
    personIndex = dbMatcher(id, "id");
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
    choice = prompt(`
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
    choice = prompt(`
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
            age = Number(validAge(prompt("Enter the age:")));
            index = showPeopleOverAge(age);
            alert(printTemplate(index));
            break;
        case "2":
            id = prompt("Enter ID:");
            alert(printTemplate(showChildren(id)));
            break;
        case "3":
            palindromePeople = [];
            people.forEach((person, personIndex) => {
                if (isPalindromeName(personIndex)) palindromePeople.push(personIndex);
                childIndex = showChildren(person.id);
                childIndex.forEach((child) => {
                    if (isPalindromeName(child)) palindromePeople.push(personIndex);
                });
            });
            alert(printTemplate(bornInEvenMonth().concat(hasAtLeastTwoChildren(), palindromePeople).filter((value, index, self) => self.indexOf(value) === index)));
            break;
        case "4":
            alert(showCityAndItsInhabitants());
            break;
        default:
            alert("Invalid choice. Please choose again.");
            return cutsQueriesAndReports();
    }
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

function showChildren(idNumber) {
    childrenIndex = dbMatcher(idNumber, "parentId");
    return childrenIndex;
}

function showPeopleOverAge(personAge) {
    arrayOfIndexes = [];
    people.forEach((person, index) => { if (Number(person.age()) >= personAge) arrayOfIndexes.push(index) });
    return arrayOfIndexes;
}

function showCityAndItsInhabitants() {
    cityList = people.forEach(person => person.city).filter((city, i) => !city.includes(city, i + 1));
    everyCityAndItsInhabitants = "";
    for (city of cityList) {
        inhabitants = dbMatcher(city, "city");
        everyCityAndItsInhabitants += printTemplate(inhabitants, city);
    }
    return everyCityAndItsInhabitants;
}

function bornInEvenMonth() {
    evenMonthPeople = [];
    people.forEach((person, index) => { if (person.dob.split("/", 2)[1] % 2 === 0) evenMonthPeople.push(index); });
    return evenMonthPeople;
}

function hasAtLeastTwoChildren() {
    parents = [];
    people.forEach((person, index) => {
        if (showChildren(person.id).length >= 2) {
            parents.push(index);
        }
    });
    return parents;
}
init();
menu();