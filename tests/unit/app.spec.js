import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { createTestingPinia } from '@pinia/testing'
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { useOfficeStore } from '@/stores'

const mock = new MockAdapter(axios);

mock.onGet("/offices").reply(200,{
  data: [{
      id: 1,
      title: "Go-Jek",
      address: "5260 Donec St.",
      name: "Hellena John",
      job: "Software Tester",
      email: "georgia.young@gmail.com",
      phone: "(808) 555-0111",
    },
    {
      id: 2,
      title: "Tokopedia",
      address: "7526 Erat. Rd.",
      name: "Tony Stark",
      job: "Iron Man",
      email: "tonystark@gmail.com",
      phone: "(808) 777-7777",
    },
    {
      id: 3,
      title: "Bukalapak",
      address: "P.O. Box 959, 8061 Tellus Av.",
      name: "Peter Parker",
      job: "Spider-Man",
      email: "spiderman@gmail.com",
      phone: "(999) 555-0111",
    },
    {
      id: 4,
      title: "Go-Car",
      address: "8467 Elementum Av.",
      name: "Bruce Banner",
      job: "Hulk",
      email: "brucebanner@gmail.com",
      phone: "(222) 123-0111",
    }
  ]
});

mock.onPost("/offices", {})

describe('App.vue', () => {
  const wrapper = mount(App, {
    global: {
      plugins: [createTestingPinia()],
    },
  })    
  it('renders title offices', () => {
    const headerTitle = wrapper.get('[id="header-title"]')
    expect(headerTitle.text()).toMatch('Offices')
  })
  it('renders button add new location', () => {
    const button = wrapper.get('[id="button-new-location"]')
    expect(button.text()).toMatch('Add New Location')
  })
  it('click button add new location will appear form',async () => {
    const button = wrapper.get('[id="button-new-location"]')
    await button.trigger('click')
    const formTitle = wrapper.get('[id="form-title"]')
    expect(formTitle.text()).toMatch('New Location')
  })
  it('display list on offices', async () => {
    const officeStore = useOfficeStore()
    await axios.get("/offices").then(function (response) {
      officeStore.offices = response.data.data
    });
    expect(wrapper.text()).toContain('Bukalapak')
  })
})
