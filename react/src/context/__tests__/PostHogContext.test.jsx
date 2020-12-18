import React from 'react'
import { render } from '@testing-library/react'
import posthog from 'posthog-js'
import { usePostHogContext, PostHogProvider } from '../'

describe('usePostHogContext hook', () => {
    beforeEach(() => {
        posthog.init('test_token', {
            api_host: 'https://test.com',
        })
    })

    it('should return a client instance from the context if available', () => {
        function App() {
            const context = usePostHogContext()
            expect(context.client).toEqual(posthog)
            return null
        }

        render(
            <PostHogProvider client={posthog}>
                <App />
            </PostHogProvider>
        )
    })

    it("should error if a client instance can't be found in the context", () => {
        console.error = jest.fn()

        function App() {
            usePostHogContext()
            return null
        }

        expect(() => render(<App />)).toThrow()
    })
})