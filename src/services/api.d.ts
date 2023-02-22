declare namespace API {
  interface Weekly {
    id: number;
    student_id: number; // 学号
    name?: string; // 姓名
    create_at: string; // 提交日期
    status: number; // 状态
    score: number; // 评分
    content: string; // 周报内容
    review: string; // 评论
  }
  interface WeeklyList {
    data?: Weekly[];
    total?: number;
    success: boolean;
    pageSize?: number;
    current?: number;
  }

  interface Student {
    id: number; // 学号
    name: string; // 姓名
    phone_number?: number; // 联系方式
    grade?: string; // 年级
    category?: string; // 类别
    specialized?: string; // 专业
    research_direction?: string; // 研究方向
    gender?: string; // 性别
    native_place?: string; // 籍贯
    isAdmin: boolean; // 是否为管理员
  }
  // interface UserList {
  //   data?: User[];
  //   total?: number;
  //   success: boolean;
  //   pageSize?: number;
  //   current?: number;
  // }
  type PageParams = {
    current?: number;
    pageSize?: number;
  };
}
