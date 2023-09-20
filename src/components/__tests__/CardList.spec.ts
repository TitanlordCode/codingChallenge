import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CardList from '../CardList.vue'

describe('CardList', () => {
  it('renders all items', () => {
    const wrapper = mount(CardList)
    expect(wrapper.findAll('.card-item').length).toBe(9)
  })  
  it('renders list bar', async () => {
    const wrapper = mount(CardList)
    const cardListBar = wrapper.find('.card-list-bar')
    expect(cardListBar.text()).toContain('All Results')
    expect(cardListBar.text()).toContain('Author (↑)')
    expect(cardListBar.text()).toContain('Datum (↑)')
    expect(cardListBar.text()).toContain('Datum (↓)')
    expect(cardListBar.text()).toContain('Latest only')
  })
  it('set filter "Test" and order by "Author (↑)"', async () => {
    const wrapper = mount(CardList)
    const searchInput = wrapper.find('.card-list-bar .card-list-bar-search input')
    const orderSelect = wrapper.find('.card-list-bar-order select')
    await searchInput.setValue('Test')
    expect(wrapper.findAll('.card-item').length).toBe(3)
    await orderSelect.setValue(1)
    expect(wrapper.findAll('.card-item').length).toBe(3)
    expect(wrapper.findAll('.card-item')[0].text()).toContain('Klaus Dietmar')
    expect(wrapper.findAll('.card-item')[2].text()).toContain('Testing enthusiast')
  })
})

describe('ListBar Search', () => {
  it('set filter "qa" (title positive)', async () => {
    const wrapper = mount(CardList)
    const searchInput = wrapper.find('.card-list-bar .card-list-bar-search input')
    await searchInput.setValue('qa')
    expect(wrapper.findAll('.card-item').length).toBe(1)
    await searchInput.setValue('')
    expect(wrapper.findAll('.card-item').length).toBe(9)
  })
  it('set filter "Test" (title positive)', async () => {
    const wrapper = mount(CardList)
    const searchInput = wrapper.find('.card-list-bar .card-list-bar-search input')
    await searchInput.setValue('Test')
    expect(wrapper.findAll('.card-item').length).toBe(3)
    await searchInput.setValue('')
    expect(wrapper.findAll('.card-item').length).toBe(9)
  })
  it('set filter "Notebook" (title negative)', async () => {
    const wrapper = mount(CardList)
    const searchInput = wrapper.find('.card-list-bar .card-list-bar-search input')
    await searchInput.setValue('Notebook')    
    expect(wrapper.findAll('.card-item').length).toBe(0)
    await searchInput.setValue('')
    expect(wrapper.findAll('.card-item').length).toBe(9)
  })
  it('set filter "special" (author positive)', async () => {
    const wrapper = mount(CardList)
    const searchInput = wrapper.find('.card-list-bar .card-list-bar-search input')
    await searchInput.setValue('special')
    expect(wrapper.findAll('.card-item').length).toBe(1)
    await searchInput.setValue('')
    expect(wrapper.findAll('.card-item').length).toBe(9)
  })
  it('set filter "Martin" (author positive)', async () => {
    const wrapper = mount(CardList)
    const searchInput = wrapper.find('.card-list-bar .card-list-bar-search input')
    await searchInput.setValue('Martin')    
    expect(wrapper.findAll('.card-item').length).toBe(2)
    await searchInput.setValue('')
    expect(wrapper.findAll('.card-item').length).toBe(9)
  })
  it('set filter "Maximilian" (author negative)', async () => {
    const wrapper = mount(CardList)
    const searchInput = wrapper.find('.card-list-bar .card-list-bar-search input')
    await searchInput.setValue('Maximilian')    
    expect(wrapper.findAll('.card-item').length).toBe(0)
    await searchInput.setValue('')
    expect(wrapper.findAll('.card-item').length).toBe(9)
  })
})

describe('ListBar Order', () => {
  it('orders by "Author (↑)"', async () => {    
    const wrapper = mount(CardList)
    const orderSelect = wrapper.find('.card-list-bar-order select')
    await orderSelect.setValue(1)
    expect(wrapper.findAll('.card-item')[0].text()).toContain('Andreas FrontendOps')
    expect(wrapper.findAll('.card-item')[8].text()).toContain('Testing enthusiast')
  })
  it('orders by "Datum (↑)"', async () => {    
    const wrapper = mount(CardList)
    const orderSelect = wrapper.find('.card-list-bar-order select')
    await orderSelect.setValue(2)
    expect(wrapper.findAll('.card-item')[0].text()).toContain('Why cypress is great for e2e testing')
    expect(wrapper.findAll('.card-item')[8].text()).toContain('Do you know Cypress?')
  })
  it('orders by "Datum (↓)"', async () => {    
    const wrapper = mount(CardList)
    const orderSelect = wrapper.find('.card-list-bar-order select')
    await orderSelect.setValue(3)
    expect(wrapper.findAll('.card-item')[0].text()).toContain('Do you know Cypress?')
    expect(wrapper.findAll('.card-item')[8].text()).toContain('Why cypress is great for e2e testing')
  })
  it('orders by "All Results"', async () => {    
    const wrapper = mount(CardList)
    const orderSelect = wrapper.find('.card-list-bar-order select')
    await orderSelect.setValue(0)
    expect(wrapper.findAll('.card-item')[0].text()).toContain('QA in 2022')
    expect(wrapper.findAll('.card-item')[8].text()).toContain('Why cypress is great for e2e testing')
  })
})

describe('ListBar Year toggle', () => {
  it('filters latest only', async () => {
    const wrapper = mount(CardList)
    const latestYearToggle = wrapper.find('.card-list-bar .card-list-bar-year')
    await latestYearToggle.trigger('click')
    expect(wrapper.findAll('.card-item').length).toBe(0)
    await latestYearToggle.trigger('click')
    expect(wrapper.findAll('.card-item').length).toBe(9)
  })
})
