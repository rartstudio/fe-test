import { mount } from '@vue/test-utils'
import FormLocation from '@/components/FormLocation.vue'
import { createTestingPinia } from '@pinia/testing'
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { useOfficeStore } from '@/stores'

const mock = new MockAdapter(axios);

mock.onPost("/offices").reply(201,{
  data: {
    id: 5,
    title: "GoPulsa",
    address: "8467 Elementum Av.",
    name: "Bruce Banner",
    job: "Hulk",
    email: "brucebanner@gmail.com",
    phone: "(222) 123-0111",
  }
})
mock.onPut("/offices/5").reply(201,{
  data: {
    id: 5,
    title: "GoPulsa",
    address: "8467 Elementum Av.",
    name: "Bruce Banner",
    job: "Hulk",
    email: "brucebanner@gmail.com",
    phone: "(222) 123-01111",
  }
})

describe('FormLocation.vue', () => {
  const wrapper = mount(FormLocation, {
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      
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
  it('add office data to form',async () => {
    const officeStore = useOfficeStore()
    await axios.post('/offices',data).then(response => {
      // add data to state
      officeStore.offices.push(response.data.data);
    })
    const result = officeStore.offices.filter(el => el.id == data.id);
    expect(result[0].id).toBe(data.id);
  })
  it('edit office data from form', async () => {
    const officeStore = useOfficeStore()
    
    // default data
    officeStore.offices.push(data);

    // updated data
    const update = {
      id: 5,
      title: "GoPulsa",
      address: "8467 Elementum Av.",
      name: "Bruce Banner",
      job: "Hulk",
      email: "brucebanner@gmail.com",
      phone: "(222) 123-01111",
    }
    
    await axios.put('/offices/5',).then(response => {
      const result = response.data.data;
      // updating state
      const index = officeStore.offices.findIndex((el) => el.id === result.id);
      officeStore.offices[index].name = result.name;
      officeStore.offices[index].job = result.job;
      officeStore.offices[index].email = result.email;
      officeStore.offices[index].title = result.title;
      officeStore.offices[index].address = result.address;
      officeStore.offices[index].phone = result.phone;
    })
    expect(data.phone).not.toBe(update.phone);
  })
})
