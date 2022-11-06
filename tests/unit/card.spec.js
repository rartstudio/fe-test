import { mount } from '@vue/test-utils'
import CardOffice from '@/components/CardOffice.vue'
import { createTestingPinia } from '@pinia/testing'
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { useOfficeStore } from '@/stores'

const mock = new MockAdapter(axios);

mock.onDelete("/offices/5").reply(201,{
  message: "success delete message"
})

describe('CardOffice.vue', () => {
  const wrapper = mount(CardOffice, {
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      office: {
        id: 5,
        title: "GoPulsa",
        address: "8467 Elementum Av.",
        name: "Bruce Banner",
        job: "Hulk",
        email: "brucebanner@gmail.com",
        phone: "(222) 123-0111",
      }
    }
  })
  const data = {
    id: 5,
    title: "GoPulsa",
    address: "8467 Elementum Av.",
    name: "Bruce Banner",
    job: "Hulk",
    email: "brucebanner@gmail.com",
    phone: "(222) 123-0111",
  }
  it('delete office data from form', async () => {
    const officeStore = useOfficeStore()
    
    // default data
    officeStore.offices.push(data);

    await axios.delete('/offices/5',).then(() => {
      officeStore.offices = officeStore.offices.filter(el => el.id !== data.id)
    })
    expect(officeStore.offices.length).toBe(0);
  })
})
