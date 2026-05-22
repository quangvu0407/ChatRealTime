# Tài Liệu Yêu Cầu

## Giới Thiệu

Tài liệu này mô tả các yêu cầu để tích hợp thư viện quản lý state Zustand vào ứng dụng chat React hiện có. Ứng dụng hiện tại đang quản lý state cục bộ trong các component bằng React hooks. Việc tích hợp này sẽ tập trung hóa quản lý state cho xác thực, hội thoại, tin nhắn và người dùng, cung cấp kiến trúc dễ mở rộng và bảo trì hơn.

## Thuật Ngữ

- **Zustand**: Thư viện quản lý state nhẹ cho ứng dụng React
- **Store**: Container state của Zustand chứa state ứng dụng và cung cấp các phương thức để cập nhật nó
- **Auth_Store**: Store Zustand quản lý state xác thực bao gồm thông tin đăng nhập và token người dùng
- **Conversation_Store**: Store Zustand quản lý dữ liệu và các thao tác hội thoại
- **Message_Store**: Store Zustand quản lý dữ liệu tin nhắn trong các hội thoại
- **User_Store**: Store Zustand quản lý thông tin hồ sơ và liên hệ người dùng
- **Persist_Middleware**: Middleware của Zustand đồng bộ hóa state store với bộ nhớ trình duyệt
- **Chat_Application**: Ứng dụng frontend dựa trên React cho nhắn tin thời gian thực
- **State_Hydration**: Quá trình tải state đã lưu từ storage vào store khi khởi tạo ứng dụng

## Yêu Cầu

### Yêu Cầu 1: Cài Đặt và Cấu Hình Zustand

**User Story:** Là một developer, tôi muốn cài đặt Zustand và các dependency của nó, để tôi có thể sử dụng nó cho quản lý state trong ứng dụng

#### Tiêu Chí Chấp Nhận

1. THE Chat_Application SHALL bao gồm zustand như một production dependency
2. THE Chat_Application SHALL bao gồm zustand/middleware/persist cho khả năng lưu trữ state
3. THE Chat_Application SHALL có cấu trúc thư mục stores tại src/stores để tổ chức code quản lý state

### Yêu Cầu 2: Quản Lý State Xác Thực

**User Story:** Là một người dùng, tôi muốn state xác thực của mình được lưu giữ qua các phiên trình duyệt, để tôi không phải đăng nhập mỗi lần truy cập ứng dụng

#### Tiêu Chí Chấp Nhận

1. THE Auth_Store SHALL duy trì state xác thực người dùng bao gồm access token, refresh token và dữ liệu hồ sơ người dùng
2. WHEN người dùng đăng nhập thành công, THE Auth_Store SHALL lưu trữ các token xác thực và thông tin người dùng
3. WHEN người dùng đăng xuất, THE Auth_Store SHALL xóa tất cả dữ liệu xác thực khỏi store và storage đã lưu
4. THE Auth_Store SHALL cung cấp các phương thức cho các thao tác đăng nhập, đăng xuất và làm mới token
5. THE Auth_Store SHALL lưu trữ state xác thực vào localStorage bằng Persist_Middleware
6. WHEN ứng dụng khởi tạo, THE Auth_Store SHALL khôi phục state xác thực từ localStorage thông qua State_Hydration
7. THE Auth_Store SHALL cung cấp phương thức để kiểm tra xem người dùng hiện có đang được xác thực hay không

### Yêu Cầu 3: Quản Lý State Hội Thoại

**User Story:** Là một người dùng, tôi muốn xem và quản lý các hội thoại của mình, để tôi có thể giao tiếp với người dùng khác

#### Tiêu Chí Chấp Nhận

1. THE Conversation_Store SHALL duy trì danh sách tất cả các hội thoại của người dùng
2. THE Conversation_Store SHALL cung cấp các phương thức để lấy hội thoại từ backend API
3. WHEN một hội thoại mới được tạo, THE Conversation_Store SHALL thêm nó vào danh sách hội thoại
4. WHEN một hội thoại được chọn, THE Conversation_Store SHALL cập nhật state hội thoại đang hoạt động
5. THE Conversation_Store SHALL duy trì ID hội thoại hiện đang được chọn
6. THE Conversation_Store SHALL cung cấp các phương thức để cập nhật metadata hội thoại như tin nhắn cuối cùng và timestamp
7. WHEN một tin nhắn mới đến, THE Conversation_Store SHALL cập nhật preview tin nhắn cuối cùng của hội thoại tương ứng

### Yêu Cầu 4: Quản Lý State Tin Nhắn

**User Story:** Là một người dùng, tôi muốn gửi và nhận tin nhắn theo thời gian thực, để tôi có thể trò chuyện với người dùng khác

#### Tiêu Chí Chấp Nhận

1. THE Message_Store SHALL duy trì tin nhắn được nhóm theo conversation ID
2. THE Message_Store SHALL cung cấp các phương thức để lấy lịch sử tin nhắn cho một hội thoại cụ thể
3. WHEN người dùng gửi tin nhắn, THE Message_Store SHALL thêm nó vào danh sách tin nhắn của hội thoại phù hợp
4. WHEN một tin nhắn mới được nhận, THE Message_Store SHALL thêm nó vào danh sách tin nhắn của hội thoại phù hợp
5. THE Message_Store SHALL cung cấp các phương thức để đánh dấu tin nhắn là đã đọc
6. THE Message_Store SHALL duy trì trạng thái loading và error của tin nhắn cho mỗi hội thoại
7. THE Message_Store SHALL cung cấp các phương thức để xóa tin nhắn khi chuyển đổi hội thoại

### Yêu Cầu 5: Quản Lý State Người Dùng

**User Story:** Là một người dùng, tôi muốn xem hồ sơ và thông tin liên hệ của người dùng khác, để tôi có thể xác định tôi đang trò chuyện với ai

#### Tiêu Chí Chấp Nhận

1. THE User_Store SHALL duy trì danh sách tất cả người dùng trong hệ thống
2. THE User_Store SHALL cung cấp các phương thức để lấy dữ liệu người dùng từ backend API
3. THE User_Store SHALL duy trì thông tin hồ sơ của người dùng hiện tại
4. WHEN dữ liệu hồ sơ người dùng được cập nhật, THE User_Store SHALL phản ánh các thay đổi ngay lập tức
5. THE User_Store SHALL cung cấp các phương thức để tìm kiếm và lọc người dùng
6. THE User_Store SHALL cache dữ liệu người dùng để giảm thiểu các lời gọi API dư thừa

### Yêu Cầu 6: Di Chuyển Các Component Hiện Có Để Sử Dụng Zustand

**User Story:** Là một developer, tôi muốn các component hiện có sử dụng Zustand stores, để quản lý state nhất quán trong toàn bộ ứng dụng

#### Tiêu Chí Chấp Nhận

1. THE Register component SHALL sử dụng Auth_Store cho các thao tác đăng ký người dùng
2. THE Login component SHALL sử dụng Auth_Store cho các thao tác xác thực người dùng
3. THE Chat component SHALL sử dụng Conversation_Store và Message_Store để hiển thị và quản lý hội thoại
4. THE NavBar component SHALL sử dụng Auth_Store để hiển thị thông tin người dùng và xử lý đăng xuất
5. WHEN một component cần state xác thực, THE component SHALL truy cập nó thông qua Auth_Store hooks
6. WHEN một component cần dữ liệu hội thoại hoặc tin nhắn, THE component SHALL truy cập nó thông qua các store hooks tương ứng

### Yêu Cầu 7: Tích Hợp API Với Stores

**User Story:** Là một developer, tôi muốn stores xử lý giao tiếp API, để logic lấy dữ liệu được tập trung hóa và có thể tái sử dụng

#### Tiêu Chí Chấp Nhận

1. THE Auth_Store SHALL thực hiện các HTTP requests đến các authentication endpoints tại /auth/login và /auth/register
2. THE Conversation_Store SHALL thực hiện các HTTP requests đến các conversation endpoints để lấy và tạo hội thoại
3. THE Message_Store SHALL thực hiện các HTTP requests đến các message endpoints để lấy và gửi tin nhắn
4. THE User_Store SHALL thực hiện các HTTP requests đến các user endpoints để lấy dữ liệu người dùng
5. WHEN một API request thất bại, THE store tương ứng SHALL cập nhật error state của nó với thông tin lỗi mô tả
6. WHEN một API request đang được thực hiện, THE store tương ứng SHALL cập nhật loading state của nó để chỉ ra các thao tác đang diễn ra
7. THE stores SHALL bao gồm authentication token từ Auth_Store trong các API request headers

### Yêu Cầu 8: Xử Lý Lỗi và Trạng Thái Loading

**User Story:** Là một người dùng, tôi muốn thấy các chỉ báo loading và thông báo lỗi, để tôi hiểu ứng dụng đang làm gì và khi nào có sự cố xảy ra

#### Tiêu Chí Chấp Nhận

1. THE Auth_Store SHALL duy trì trạng thái loading và error cho các thao tác xác thực
2. THE Conversation_Store SHALL duy trì trạng thái loading và error cho các thao tác hội thoại
3. THE Message_Store SHALL duy trì trạng thái loading và error cho các thao tác tin nhắn
4. THE User_Store SHALL duy trì trạng thái loading và error cho các thao tác người dùng
5. WHEN một thao tác thất bại, THE store tương ứng SHALL đặt thông báo lỗi mà các component có thể hiển thị
6. WHEN một thao tác bắt đầu, THE store tương ứng SHALL đặt loading state thành true
7. WHEN một thao tác hoàn thành, THE store tương ứng SHALL đặt loading state thành false

### Yêu Cầu 9: Khởi Tạo và Dọn Dẹp Store

**User Story:** Là một developer, tôi muốn stores khởi tạo đúng cách và dọn dẹp tài nguyên, để ứng dụng không có rò rỉ bộ nhớ hoặc dữ liệu cũ

#### Tiêu Chí Chấp Nhận

1. WHEN ứng dụng khởi động, THE Auth_Store SHALL thử State_Hydration từ localStorage
2. WHEN ứng dụng khởi động và một token hợp lệ tồn tại, THE Auth_Store SHALL xác thực token với backend
3. WHEN người dùng đăng xuất, THE stores SHALL xóa tất cả dữ liệu cụ thể của người dùng
4. THE stores SHALL cung cấp các phương thức reset để trở về trạng thái ban đầu
5. WHEN chuyển đổi giữa các người dùng, THE stores SHALL xóa dữ liệu người dùng trước đó trước khi tải dữ liệu người dùng mới

### Yêu Cầu 10: An Toàn Kiểu và Trải Nghiệm Developer

**User Story:** Là một developer, tôi muốn các giao diện store an toàn về kiểu, để tôi có thể phát hiện lỗi trong quá trình phát triển và có hỗ trợ IDE tốt hơn

#### Tiêu Chí Chấp Nhận

1. THE stores SHALL định nghĩa các TypeScript interfaces cho tất cả các state shapes
2. THE stores SHALL định nghĩa các TypeScript types cho tất cả các action methods
3. THE stores SHALL export các typed hooks để component sử dụng
4. THE store files SHALL bao gồm các JSDoc comments cho các JavaScript files để cung cấp type hints
5. WHEN một developer sử dụng store hook, THE IDE SHALL cung cấp autocomplete cho các state và methods có sẵn
