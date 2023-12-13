import torch
import numpy as np
import os
# 这里的cv是opencv-python
# cd anaconda3/bin 
# pip3 install opencv-python
import cv2

# 将numpy转为tensor
a = np.zeros([2, 2])
print(a)
out = torch.from_numpy(a)
print(out)

# 用opencv读取文件
print(os.getcwd())
# data = cv2.imread("/Users/yafei/learn/learn_code_pool/pytorch入门到进阶/03/test.png")
# 或者
data = cv2.imread("./pytorch入门到进阶/03/test.png")
print(data)
# 对图片做一个可视化，会弹出图片
cv2.imshow("test1", data)
cv2.waitKey(0)

# 放到GPU上运算
print('GPU-----------')
out = torch.from_numpy(data)
print(out)
out = out.to(torch.device("mps"))
print(out)
print(out.is_mps)

# 返回cpu上运算，做转置(在h上？)
out = torch.flip(out, dims=[0])
out = out.to(torch.device("cpu"))
print(out.is_mps)
print(out.is_cuda)
data = out.numpy()
cv2.imshow("test2", data)
cv2.waitKey(0)