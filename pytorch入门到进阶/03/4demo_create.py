import torch
import numpy as np

aa = np.array([[1, 2], [3, 4]])
print(aa)

a = torch.Tensor([[1, 2],[3, 4]])
print(a)
print(a.type()) #torch.FloatTensorR

# 随机生成2行，3列的tensor
b = torch.Tensor(2, 3)
print(b)

d = torch.tensor(((1, 2), (3, 4)))
print(d) # 为整数，a为浮点数
print(d.type()) # torch.LongTensor
print(d.type_as(a))

# 全为0
d = torch.empty(2,3)
print(d)
print(d.type())
print(d.type_as(a))

# 全0的tensor
d = torch.zeros(2,3)
print(d.type())
print(d.type_as(a))

d = torch.zeros_like(d) # 创建跟d结构一样，但是全0的tensor
print(d.type())
print(d.type_as(a))

# 单位矩阵：对角线为1，其他为0
d = torch.eye(2, 2)
print(d.type())
print(d.type_as(a))

# 全1的tensor
d = torch.ones(2, 2)
print(d.type())
print(d.type_as(a))

d = torch.ones_like(d)
print(d.type())
print(d.type_as(a))

# 随机生成0-1之间的值
d = torch.rand(2, 3)
print(d)
print(d.type())
print(d.type_as(a))

# 序列:生成2-10之间的随机整数，step为2
d = torch.arange(2, 10, 2)
print(d) # tensor([2, 4, 6, 8])
print(d.type())
print(d.type_as(a))

# 拿到等间隔的n个数字
d = torch.linspace(10, 2, 3) # 拿到从2到10的等间隔的3个数字
print(d)
# tensor([10.,  6.,  2.])
print(d.type())
print(d.type_as(a))

# 生成从0到n（不含n）的n个随机数字
c = torch.randperm(8)
print(c)

dd = torch.normal(mean=0, std=torch.rand(5), out=b)
print(dd)
# tensor([ 0.1379, -1.0947,  0.2247,  0.7648,  1.4492])
print(b)


dd = torch.normal(mean=0, std=1, size=(2, 3), out=b)
print(b)
print(dd)

d = torch.normal(mean=torch.rand(5), std=torch.rand(5))
print(d.type())
print(d.type_as(a))

# 均匀分布
d = torch.Tensor(2, 2).uniform_(-1, 1)
print(d)
print(d.type())
print(d.type_as(a))


d = torch.randperm(10)
print(d)
print(d.type())
print(d.type_as(a))
