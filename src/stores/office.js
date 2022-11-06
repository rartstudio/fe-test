import { defineStore } from 'pinia';

export const useOfficeStore = defineStore('offices',{
    state: () => ({
        // ui mode
        // offices: [{
        //     id: 1,
        //     title: "Go-Jek",
        //     address: "5260 Donec St.",
        //     name: "Hellena John",
        //     job: "Software Tester",
        //     email: "georgia.young@gmail.com",
        //     phone: "(808) 555-0111",
        //   },
        //   {
        //     id: 2,
        //     title: "Tokopedia",
        //     address: "7526 Erat. Rd.",
        //     name: "Tony Stark",
        //     job: "Iron Man",
        //     email: "tonystark@gmail.com",
        //     phone: "(808) 777-7777",
        //   },
        //   {
        //     id: 3,
        //     title: "Bukalapak",
        //     address: "P.O. Box 959, 8061 Tellus Av.",
        //     name: "Peter Parker",
        //     job: "Spider-Man",
        //     email: "spiderman@gmail.com",
        //     phone: "(999) 555-0111",
        //   },
        //   {
        //     id: 4,
        //     title: "Go-Car",
        //     address: "8467 Elementum Av.",
        //     name: "Bruce Banner",
        //     job: "Hulk",
        //     email: "brucebanner@gmail.com",
        //     phone: "(222) 123-0111",
        //   }
        // ]

        // test mode
        offices: []
    }),
    actions: {
      addOffice(office){
        this.offices.push(office)
      },
      updateOffice(office){
        const index = this.offices.findIndex((el) => el.id === office.id);
        this.offices[index].name = office.name;
        this.offices[index].job = office.job;
        this.offices[index].email = office.email;
        this.offices[index].title = office.title;
        this.offices[index].address = office.address;
        this.offices[index].phone = office.phone;
      },
      deleteOffice(id){
        this.offices = this.offices.filter((el) => el.id !== id)
      }
    },
    getters: {
      getOffices: (state) => state.offices,
      getLastOfficeId: (state) => Math.max(...state.offices.map(el => el.id))
    }
});
