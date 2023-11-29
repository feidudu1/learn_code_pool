import torch
a = torch.Tensor([[1, 2],[3, 4]])
print(a)
print(a.type()) #torch.FloatTensor

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

# 随机生成
d = torch.rand(2, 3)
print(d.type())
print(d.type_as(a))

d = torch.arange(2, 10, 2)
print(d.type())
print(d.type_as(a))

d = torch.linspace(10, 2, 3)
print(d.type())
print(d.type_as(a))

dd = torch.normal(mean=0, std=1, size=(2, 3), out=b)
print(b)
print(dd)

d = torch.normal(mean=torch.rand(5), std=torch.rand(5))
print(d.type())
print(d.type_as(a))

d = torch.Tensor(2, 2).uniform_(-1, 1)
print(d.type())
print(d.type_as(a))


d = torch.randperm(10)
print(d.type())
print(d.type_as(a))
