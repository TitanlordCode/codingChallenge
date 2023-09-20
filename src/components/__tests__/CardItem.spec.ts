import type { CardItemType } from '@/types'
import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import CardItem from '../CardItem.vue'

const item = {
  id: 1,
  author: 'Benjamin Neuberger',
  title: 'Meine Coding Challenge',
  dateAdded: '2022-01-20',
  images: [
    {
      portrait: ['https://picsum.photos/900/1600', 'https://picsum.photos/450/800'],
      landscape: ['https://picsum.photos/1600/900', 'https://picsum.photos/800/450']
    }
  ],
  likes: 12
} as CardItemType

describe('CardItem', () => {
  it('renders credentials', () => {
    const wrapper = mount(CardItem, { props: { data: item } })
    expect(wrapper.text()).toContain('BN')
  })
  it('renders author', () => {
    const wrapper = mount(CardItem, { props: { data: item } })
    expect(wrapper.text()).toContain('Benjamin Neuberger')
  })
  it('renders date', () => {
    const wrapper = mount(CardItem, { props: { data: item } })
    expect(wrapper.text()).toContain('20 Januar')
  })
  it('renders title', () => {
    const wrapper = mount(CardItem, { props: { data: item } })
    expect(wrapper.text()).toContain('Meine Coding Challenge')
  })
  it('renders likes', () => {
    const wrapper = mount(CardItem, { props: { data: item } })
    expect(wrapper.text()).toContain('12')
  })
  it('adds and removes like', async () => {
    const wrapper = mount(CardItem, { props: { data: item } })
    const likeButton = wrapper.get(".like-button")
    await likeButton.trigger('click')
    expect(wrapper.text()).toContain('13')
    await likeButton.trigger('click')
    expect(wrapper.text()).toContain('12')
  })
})
