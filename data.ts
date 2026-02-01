
import { Question } from './types';

export const PHONETICS_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Trong từ 'Nhụ' (Hang Soi Nhụ tại Vịnh Hạ Long), từ này mang thanh điệu nào?",
    options: ["Thanh Hỏi", "Thanh Nặng", "Thanh Ngã", "Thanh Huyền"],
    answer: "Thanh Nặng",
    hint: "Hãy để ý dấu chấm dưới chữ 'u'.",
    type: "multiple-choice"
  },
  {
    id: 2,
    text: "Chọn thanh điệu đúng cho từ 'tiêu' trong từ 'Hồ tiêu' (đặc sản Phú Quốc).",
    options: ["Thanh Ngang", "Thanh Sắc", "Thanh Huyền", "Thanh Nặng"],
    answer: "Thanh Ngang",
    hint: "Từ này không có dấu thanh nào cả.",
    type: "multiple-choice"
  },
  {
    id: 3,
    text: "Chọn dấu thanh đúng cho từ 'Ông' trong lễ hội 'Nghinh Ông' tại Phú Quốc.",
    options: ["Thanh Ngang", "Thanh Huyền", "Thanh Hỏi", "Thanh Sắc"],
    answer: "Thanh Ngang",
    hint: "Tương tự như từ 'tiêu' ở câu trước nhé!",
    type: "multiple-choice"
  },
  {
    id: 4,
    text: "Chọn dấu thanh đúng cho từ 'Đặc' trong 'Đặc khu Phú Quốc'.",
    options: ["Thanh Sắc", "Thanh Nặng", "Thanh Huyền", "Thanh Ngã"],
    answer: "Thanh Nặng",
    hint: "Dấu chấm nằm ở phía dưới chữ cái.",
    type: "multiple-choice"
  },
  {
    id: 5,
    text: "Xác định thanh điệu của từ 'Cầu' trong địa danh 'Chùa Cầu' (Hội An).",
    options: ["Thanh Ngang", "Thanh Huyền", "Thanh Hỏi", "Thanh Ngã"],
    answer: "Thanh Huyền",
    hint: "Dấu thanh này giống như một đường kẻ chéo từ trái sang phải.",
    type: "multiple-choice",
    explanation: "Đây là thanh vực thấp, phát âm trầm kéo dài."
  },
  {
    id: 6,
    text: "Xác định thanh điệu của từ 'Vạn' trong làng chài 'Cửa Vạn' ở Vịnh Hạ Long.",
    options: ["Thanh Hỏi", "Thanh Nặng", "Thanh Ngã", "Thanh Huyền"],
    answer: "Thanh Nặng",
    hint: "Lại là một dấu chấm nhỏ xinh dưới chữ 'a'.",
    type: "multiple-choice"
  },
  {
    id: 7,
    text: "Xác định thanh điệu của từ 'Hộ' trong địa danh 'Chùa Hộ Quốc' (Phú Quốc).",
    options: ["Thanh Hỏi", "Thanh Nặng", "Thanh Ngã", "Thanh Sắc"],
    answer: "Thanh Nặng",
    hint: "Thanh này luôn đi kèm với dấu chấm phía dưới.",
    type: "multiple-choice"
  }
];

export const VOCABULARY_QUESTIONS = {
  matching: [
    { id: 'm1', left: 'Mỹ nghệ gỗ Hội An', right: 'Làng Kim Bồng' },
    { id: 'm2', left: 'Nam Hải Tướng quân', right: 'Cá Ông (Cá voi)' },
    { id: 'm3', left: 'Món ăn đặc trưng Hội An', right: 'Cao lầu' }
  ],
  slang: [
    { id: 's1', left: 'Vuýp', right: 'VIP cực ngầu' },
    { id: 's2', left: '+1 máy', right: 'Đồng ý, tôi cũng vậy' },
    { id: 's3', left: 'Toang', right: 'Thất bại, hỏng việc' },
    { id: 's4', left: 'Sao phải xoắn', right: 'Bình tĩnh, đừng lo' },
    { id: 's5', left: 'Còn cái nịt', right: 'Mất hết, không còn gì' }
  ],
  genZ: {
    id: 10,
    text: "Khi đứng trước phố cổ Hội An về đêm, dùng cụm từ nào để khen theo trend Gen Z?",
    options: ["Rất đẹp", "Tuyệt đối điện ảnh", "Ok fine", "Khá là ổn"],
    answer: "Tuyệt đối điện ảnh",
    hint: "Cụm từ này liên quan đến phim ảnh (cinema).",
    type: "multiple-choice"
  }
};

export const GRAMMAR_QUESTIONS: Question[] = [
  {
    id: 20,
    text: "Sắp xếp thành câu đúng (S-V-Adj):",
    answer: ["Chả mực", "Hạ Long", "rất", "ngon"],
    options: ["rất", "Hạ Long", "ngon", "Chả mực"],
    hint: "Bắt đầu bằng tên món ăn nhé.",
    type: "reorder"
  },
  {
    id: 21,
    text: "Trong câu 'Du khách thích ăn bánh vạc ở Hội An', chủ ngữ là gì?",
    options: ["Du khách", "Bánh vạc", "Hội An", "Thích ăn"],
    answer: "Du khách",
    hint: "Ai là người đang thực hiện hành động?",
    type: "multiple-choice"
  },
  {
    id: 22,
    text: "Hoàn thiện câu: 'Kiến trúc chùa Hộ Quốc thật hùng vĩ ...?'",
    options: ["ạ", "nhé", "nhỉ", "đấy"],
    answer: "nhỉ",
    hint: "Tình thái từ dùng để hỏi xác nhận sự đồng tình.",
    type: "multiple-choice"
  },
  {
    id: 23,
    text: "Hỏi giá lịch sự: 'Bác cho cháu hỏi giá tiêu sọ là bao nhiêu ...?'",
    options: ["nhé", "nhỉ", "ạ", "đấy"],
    answer: "ạ",
    hint: "Từ này thể hiện sự lễ phép khi nói với người lớn tuổi.",
    type: "multiple-choice"
  },
  {
    id: 24,
    text: "Gặp ông cụ 70 tuổi ở làng chài: 'Chào ..., cháu muốn xem đan lưới.'",
    options: ["Bạn", "Em", "Ông", "Cháu"],
    answer: "Ông",
    hint: "Dùng đại từ phù hợp với người lớn tuổi hơn mình nhiều.",
    type: "multiple-choice"
  },
  {
    id: 25,
    text: "Sửa lỗi chính tả: 'Vịnh Hạ Long là di sản thiên nhiên thế dới'",
    options: ["giới", "jới", "zới", "dưới"],
    answer: "giới",
    hint: "Chữ cái đầu tiên là 'g'.",
    type: "multiple-choice"
  },
  {
    id: 26,
    text: "Sửa lỗi chính tả: 'Hội An là bảo tàng sống lưu giữ hồn dân tộk'",
    options: ["tộc", "tọc", "tục", "tội"],
    answer: "tộc",
    hint: "Kết thúc bằng âm 'c'.",
    type: "multiple-choice"
  }
];
