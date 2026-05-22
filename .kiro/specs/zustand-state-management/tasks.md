# Kế Hoạch Implementation: Tích Hợp Zustand State Management

## Tổng Quan

Tài liệu này chứa danh sách các tasks implementation để tích hợp Zustand vào ứng dụng chat React. Implementation sẽ tạo 4 stores chính (Auth, User, Conversation, Message) và migrate các components hiện có để sử dụng centralized state management.

## Tasks

- [x] 1. Setup infrastructure và dependencies
  - Cài đặt zustand và fast-check packages
  - Tạo cấu trúc thư mục stores, types, utils
  - Setup API client với axios/fetch configuration
  - Configure request/response interceptors cho token injection
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2. Implement Auth Store
  - [x] 2.1 Tạo Auth Store với state shape và actions cơ bản
    - Define state shape (user, tokens, isAuthenticated, isLoading, error, isHydrated)
    - Implement actions: login, register, logout, setUser, setTokens, clearAuth
    - Setup persist middleware với localStorage
    - Implement checkAuth và validateToken utilities
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ]* 2.2 Write property test cho Auth Store - Property 1
    - **Property 1: Đăng nhập thành công lưu trữ credentials**
    - **Validates: Requirements 2.2**

  - [ ]* 2.3 Write property test cho Auth Store - Property 2
    - **Property 2: Đăng xuất xóa toàn bộ auth state**
    - **Validates: Requirements 2.3, 9.3**

  - [ ]* 2.4 Write property test cho Auth Store - Property 3
    - **Property 3: Auth state persistence round-trip**
    - **Validates: Requirements 2.5, 2.6**

  - [ ]* 2.5 Write property test cho Auth Store - Property 4
    - **Property 4: Authentication status consistency**
    - **Validates: Requirements 2.7**

  - [ ]* 2.6 Write unit tests cho Auth Store
    - Test login success/failure scenarios
    - Test logout cleanup
    - Test token refresh flow
    - Test hydration từ localStorage
    - Test edge cases (empty credentials, malformed tokens, expired tokens)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [ ] 3. Implement token refresh và error handling cho Auth Store
  - [ ] 3.1 Implement refreshAccessToken action
    - Gọi POST /auth/refresh endpoint
    - Update accessToken trong store
    - Handle refresh failure (force logout)
    - _Requirements: 2.4, 7.1, 7.5, 7.6_

  - [ ] 3.2 Implement error handling patterns
    - Handle 401 (invalid credentials)
    - Handle 429 (rate limiting)
    - Handle network errors
    - Set user-friendly error messages
    - _Requirements: 8.1, 8.5, 8.6, 8.7_

  - [ ]* 3.3 Write property test cho token refresh - Property 17
    - **Property 17: Token validation on app startup**
    - **Validates: Requirements 9.2**

  - [ ]* 3.4 Write unit tests cho error handling
    - Test các error scenarios (401, 429, network errors)
    - Test error message formatting
    - Test loading state transitions
    - _Requirements: 8.1, 8.5, 8.6, 8.7_

- [ ] 4. Migrate Login và Register components để sử dụng Auth Store
  - [ ] 4.1 Update Login component
    - Replace local state với useAuthStore hook
    - Call authStore.login() trong submit handler
    - Display error messages từ store
    - Show loading state từ store
    - _Requirements: 6.2, 6.5_

  - [ ] 4.2 Update Register component
    - Replace local state với useAuthStore hook
    - Call authStore.register() trong submit handler
    - Display error messages từ store
    - Show loading state từ store
    - _Requirements: 6.1, 6.5_

  - [ ] 4.3 Update NavBar component
    - Use authStore để display user info
    - Implement logout handler với authStore.logout()
    - Show/hide elements dựa trên isAuthenticated
    - _Requirements: 6.4, 6.5_

- [ ] 5. Checkpoint - Đảm bảo Auth Store hoạt động đúng
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement User Store
  - [ ] 6.1 Tạo User Store với state shape và actions
    - Define state shape (users, currentUser, lastFetchTime, isLoading, error)
    - Implement actions: fetchUsers, fetchUserById, setCurrentUser, updateCurrentUser
    - Implement search và filter utilities (searchUsers, filterUsers)
    - Implement caching logic với lastFetchTime
    - Implement updateUserOnlineStatus action
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 6.2 Write property test cho User Store - Property 11
    - **Property 11: Cập nhật user profile phản ánh ngay lập tức**
    - **Validates: Requirements 5.4**

  - [ ]* 6.3 Write property test cho User Store - Property 12
    - **Property 12: Search users trả về kết quả chính xác**
    - **Validates: Requirements 5.5**

  - [ ]* 6.4 Write property test cho User Store - Property 13
    - **Property 13: User cache giảm API calls**
    - **Validates: Requirements 5.6**

  - [ ]* 6.5 Write unit tests cho User Store
    - Test fetchUsers với và không có cache
    - Test searchUsers với various queries
    - Test updateCurrentUser
    - Test edge cases (empty user list, invalid user ID)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ] 7. Implement API integration và error handling cho User Store
  - [ ] 7.1 Implement API calls
    - GET /users endpoint integration
    - GET /users/:id endpoint integration
    - PATCH /users/:id endpoint integration
    - GET /users/search endpoint integration
    - Include Authorization header từ Auth Store
    - _Requirements: 7.4, 7.7_

  - [ ] 7.2 Implement error và loading states
    - Set isLoading during API calls
    - Handle API errors với descriptive messages
    - Handle network errors
    - _Requirements: 8.4, 8.5, 8.6, 8.7_

  - [ ]* 7.3 Write unit tests cho API integration
    - Test successful API calls
    - Test error scenarios
    - Test loading state transitions
    - Test Authorization header inclusion
    - _Requirements: 7.4, 7.7, 8.4_

- [ ] 8. Implement Conversation Store
  - [ ] 8.1 Tạo Conversation Store với state shape và actions
    - Define state shape (conversations, activeConversationId, isLoading, error)
    - Implement actions: fetchConversations, createConversation, deleteConversation
    - Implement setActiveConversation, clearActiveConversation
    - Implement updateLastMessage, incrementUnreadCount, resetUnreadCount
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ]* 8.2 Write property test cho Conversation Store - Property 5
    - **Property 5: Tạo conversation thêm vào danh sách**
    - **Validates: Requirements 3.3**

  - [ ]* 8.3 Write property test cho Conversation Store - Property 6
    - **Property 6: Chọn conversation cập nhật active state**
    - **Validates: Requirements 3.4**

  - [ ]* 8.4 Write property test cho Conversation Store - Property 7
    - **Property 7: Message mới cập nhật conversation preview**
    - **Validates: Requirements 3.7**

  - [ ]* 8.5 Write unit tests cho Conversation Store
    - Test fetchConversations
    - Test createConversation
    - Test setActiveConversation
    - Test updateLastMessage
    - Test edge cases (empty list, invalid ID, duplicate conversations)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 9. Implement API integration và error handling cho Conversation Store
  - [ ] 9.1 Implement API calls
    - GET /conversations endpoint integration
    - POST /conversations endpoint integration
    - DELETE /conversations/:id endpoint integration
    - PATCH /conversations/:id endpoint integration
    - Include Authorization header từ Auth Store
    - _Requirements: 7.2, 7.7_

  - [ ] 9.2 Implement error và loading states
    - Set isLoading during API calls
    - Handle API errors với descriptive messages
    - Handle network errors
    - _Requirements: 8.2, 8.5, 8.6, 8.7_

  - [ ]* 9.3 Write unit tests cho API integration
    - Test successful API calls
    - Test error scenarios
    - Test loading state transitions
    - Test Authorization header inclusion
    - _Requirements: 7.2, 7.7, 8.2_

- [ ] 10. Checkpoint - Đảm bảo User và Conversation Stores hoạt động đúng
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement Message Store
  - [ ] 11.1 Tạo Message Store với state shape và actions
    - Define state shape (messagesByConversation, loadingStates, errorStates)
    - Implement actions: fetchMessages, sendMessage, deleteMessage
    - Implement markAsRead, updateMessageStatus, addMessage
    - Implement clearMessages per conversation
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ]* 11.2 Write property test cho Message Store - Property 8
    - **Property 8: Thêm message vào conversation**
    - **Validates: Requirements 4.3, 4.4**

  - [ ]* 11.3 Write property test cho Message Store - Property 9
    - **Property 9: Đánh dấu messages là đã đọc**
    - **Validates: Requirements 4.5**

  - [ ]* 11.4 Write property test cho Message Store - Property 10
    - **Property 10: Xóa messages của conversation**
    - **Validates: Requirements 4.7**

  - [ ]* 11.5 Write unit tests cho Message Store
    - Test fetchMessages
    - Test sendMessage
    - Test addMessage (real-time)
    - Test markAsRead
    - Test clearMessages
    - Test edge cases (empty content, long messages, special characters)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [ ] 12. Implement API integration và error handling cho Message Store
  - [ ] 12.1 Implement API calls
    - GET /messages/:conversationId endpoint integration
    - POST /messages endpoint integration
    - DELETE /messages/:id endpoint integration
    - PATCH /messages/read endpoint integration
    - Include Authorization header từ Auth Store
    - _Requirements: 7.3, 7.7_

  - [ ] 12.2 Implement per-conversation error và loading states
    - Set loadingStates[conversationId] during API calls
    - Handle API errors với errorStates[conversationId]
    - Handle network errors
    - _Requirements: 8.3, 8.5, 8.6, 8.7_

  - [ ]* 12.3 Write unit tests cho API integration
    - Test successful API calls
    - Test error scenarios per conversation
    - Test loading state transitions per conversation
    - Test Authorization header inclusion
    - _Requirements: 7.3, 7.7, 8.3_

- [ ] 13. Migrate Chat component để sử dụng Conversation và Message Stores
  - [ ] 13.1 Update Chat component - Conversation list
    - Replace local state với useConversationStore hook
    - Display conversations từ store
    - Implement conversation selection với setActiveConversation
    - Show unread counts từ store
    - _Requirements: 6.3, 6.6_

  - [ ] 13.2 Update Chat component - Message list và sending
    - Replace local state với useMessageStore hook
    - Display messages từ activeConversation
    - Implement send message với messageStore.sendMessage()
    - Handle real-time message updates với addMessage
    - Clear messages khi switch conversation
    - _Requirements: 6.3, 6.6_

  - [ ] 13.3 Integrate Conversation và Message Stores
    - Update conversation lastMessage khi send/receive message
    - Reset unread count khi open conversation
    - Increment unread count khi receive message in inactive conversation
    - _Requirements: 3.7, 6.3_

- [ ] 14. Checkpoint - Đảm bảo tất cả stores hoạt động cùng nhau
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Implement cross-store integration và cleanup logic
  - [ ] 15.1 Implement store reset methods
    - Add reset() method cho mỗi store
    - Reset trở về initial state (empty arrays, null objects, false flags)
    - _Requirements: 9.4_

  - [ ] 15.2 Implement logout cleanup flow
    - Call reset() trên tất cả stores khi logout
    - Clear localStorage
    - Verify không còn dữ liệu user cũ
    - _Requirements: 9.3, 9.5_

  - [ ] 15.3 Implement login data fetching flow
    - Fetch users sau khi login thành công
    - Fetch conversations sau khi login thành công
    - Handle errors trong initialization flow
    - _Requirements: 9.1, 9.2_

  - [ ]* 15.4 Write property test - Property 18
    - **Property 18: Store reset trở về initial state**
    - **Validates: Requirements 9.4**

  - [ ]* 15.5 Write property test - Property 19
    - **Property 19: User switching clears previous data**
    - **Validates: Requirements 9.5**

  - [ ]* 15.6 Write integration tests
    - Test login → fetch data flow
    - Test logout → clear all flow
    - Test send message → update conversation flow
    - Test user switching flow
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 16. Implement Authorization header injection
  - [ ] 16.1 Setup API interceptor
    - Add request interceptor trong api.js
    - Inject "Bearer {accessToken}" vào Authorization header
    - Get accessToken từ Auth Store
    - Skip injection cho public endpoints (/auth/login, /auth/register)
    - _Requirements: 7.7_

  - [ ]* 16.2 Write property test - Property 16
    - **Property 16: Authenticated requests include token**
    - **Validates: Requirements 7.7**

  - [ ]* 16.3 Write unit tests cho interceptor
    - Test token injection cho authenticated requests
    - Test skipping injection cho public endpoints
    - Test behavior khi no token available
    - _Requirements: 7.7_

- [ ] 17. Implement comprehensive error handling
  - [ ] 17.1 Add error handling patterns cho tất cả stores
    - Handle 401 errors (invalid credentials, expired token)
    - Handle 429 errors (rate limiting)
    - Handle network errors (no connection)
    - Handle validation errors (empty fields, invalid format)
    - Set user-friendly Vietnamese error messages
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [ ]* 17.2 Write property test - Property 14
    - **Property 14: Failed operations set error state**
    - **Validates: Requirements 7.5, 8.5**

  - [ ]* 17.3 Write property test - Property 15
    - **Property 15: Loading state lifecycle**
    - **Validates: Requirements 7.6, 8.6, 8.7**

  - [ ]* 17.4 Write unit tests cho error scenarios
    - Test mỗi error type cho mỗi store
    - Test error message formatting
    - Test error state clearing
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 18. Add TypeScript types và JSDoc comments
  - [ ] 18.1 Create type definitions
    - Define User, Conversation, Message, AuthState types trong types/store.types.js
    - Export types cho reuse
    - _Requirements: 10.1, 10.2_

  - [ ] 18.2 Add JSDoc comments cho tất cả stores
    - Document state shape với @typedef
    - Document action methods với @param và @returns
    - Add usage examples trong comments
    - _Requirements: 10.4, 10.5_

  - [ ] 18.3 Export typed hooks
    - Create custom hooks với type hints
    - Export từ stores/index.js
    - _Requirements: 10.3, 10.5_

- [ ] 19. Performance optimization
  - [ ] 19.1 Implement selective re-renders
    - Use Zustand selectors trong components
    - Avoid subscribing to entire store
    - Only re-render khi relevant state changes
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [ ] 19.2 Implement message pagination
    - Add pagination params cho fetchMessages
    - Load messages in chunks (e.g., 50 messages per page)
    - Implement "load more" functionality
    - _Requirements: 4.2_

  - [ ] 19.3 Implement conversation lazy loading
    - Load conversations on demand
    - Cache loaded conversations
    - Implement pull-to-refresh
    - _Requirements: 3.2_

  - [ ]* 19.4 Write performance tests
    - Test re-render counts với React DevTools Profiler
    - Test memory usage với large datasets
    - Test API call reduction với caching
    - _Requirements: 5.6_

- [ ] 20. Final testing và polish
  - [ ] 20.1 Run full test suite
    - Run all unit tests
    - Run all property tests với 100 iterations
    - Verify test coverage ≥ 80%
    - Fix any failing tests
    - _Requirements: All_

  - [ ] 20.2 Manual testing
    - Test complete login/register flow
    - Test conversation creation và selection
    - Test message sending và receiving
    - Test logout và cleanup
    - Test error scenarios
    - Test across different browsers
    - _Requirements: All_

  - [ ] 20.3 Code cleanup và documentation
    - Remove commented-out old code
    - Add README với usage examples
    - Document common patterns
    - Add troubleshooting guide
    - _Requirements: 10.4, 10.5_

- [ ] 21. Final checkpoint - Deployment readiness
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks đánh dấu `*` là optional và có thể skip để có MVP nhanh hơn
- Mỗi task reference các requirements cụ thể để đảm bảo traceability
- Property tests validate các universal correctness properties từ design document
- Unit tests validate các ví dụ cụ thể và edge cases
- Checkpoints đảm bảo validation từng bước trước khi tiếp tục
- Implementation sử dụng JavaScript với JSDoc comments cho type safety
- Tất cả error messages nên bằng tiếng Việt để phù hợp với user base

