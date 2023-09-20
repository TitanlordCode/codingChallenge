import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CardListBar from '../CardListBar.vue'

describe('Search', () => {
  it('emittes filter-set', async () => {
    const wrapper = mount(CardListBar)
    const searchInput = wrapper.find('.card-list-bar-search input')
    await searchInput.setValue('qa')
    expect(wrapper.emitted()['filter-set']).toBeTruthy()
    expect(wrapper.emitted()['filter-set'].length).toBe(1)
    await searchInput.setValue('')
    expect(wrapper.emitted()['filter-set']).toBeTruthy()
    expect(wrapper.emitted()['filter-set'].length).toBe(2)
  })
})

describe('Orders', () => {
  it('emittes "order-set" for "Author (↑)"', async () => {
    const wrapper = mount(CardListBar)
    const orderSelect = wrapper.find('.card-list-bar-order select')
    await orderSelect.setValue(1)
    expect(wrapper.emitted()['order-set']).toBeTruthy()
    expect(wrapper.emitted()['order-set'].length).toBe(1)
    await orderSelect.setValue(0)
    expect(wrapper.emitted()['order-set']).toBeTruthy()
    expect(wrapper.emitted()['order-set'].length).toBe(2)
  })
  it('emittes "order-set" for "Datum (↑)"', async () => {
    const wrapper = mount(CardListBar)
    const orderSelect = wrapper.find('.card-list-bar-order select')
    await orderSelect.setValue(2)
    expect(wrapper.emitted()['order-set']).toBeTruthy()
    expect(wrapper.emitted()['order-set'].length).toBe(1)
    await orderSelect.setValue(0)
    expect(wrapper.emitted()['order-set']).toBeTruthy()
    expect(wrapper.emitted()['order-set'].length).toBe(2)
  })
  it('emittes "order-set" for "Datum (↓)"', async () => {
    const wrapper = mount(CardListBar)
    const orderSelect = wrapper.find('.card-list-bar-order select')
    await orderSelect.setValue(3)
    expect(wrapper.emitted()['order-set']).toBeTruthy()
    expect(wrapper.emitted()['order-set'].length).toBe(1)
    await orderSelect.setValue(0)
    expect(wrapper.emitted()['order-set']).toBeTruthy()
    expect(wrapper.emitted()['order-set'].length).toBe(2)
  })
  it('emittes "order-set" for "All Results"', async () => {
    const wrapper = mount(CardListBar)
    const orderSelect = wrapper.find('.card-list-bar-order select')
    await orderSelect.setValue(0)
    expect(wrapper.emitted()['order-set']).toBeTruthy()
    expect(wrapper.emitted()['order-set'].length).toBe(1)
  })
})

describe('Year Toggle', () => {
  it('filters latest only toggle', async () => {
    const wrapper = mount(CardListBar)
    const latestYearToggle = wrapper.find('.card-list-bar-year')
    await latestYearToggle.trigger('click')
    expect(wrapper.emitted()['filter-set']).toBeTruthy()
    expect(wrapper.emitted()['filter-set'].length).toBe(1)
    await latestYearToggle.trigger('click')
    expect(wrapper.emitted()['filter-set']).toBeTruthy()
    expect(wrapper.emitted()['filter-set'].length).toBe(2)
  })
})