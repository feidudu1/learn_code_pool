import torch

#torch.where
a = torch.rand(4, 4)
b = torch.rand(4, 4)
print(a)
print(b)
out = torch.where(a > 0.5, a, b)
print(out)


#torch.index_select
print("torch.index_select")
a = torch.rand(4, 4)
print(a)
out = torch.index_select(a, dim=0, index=torch.tensor([0, 3, 2]))
# 取a的第0行、第3行、第2行构成新的维度为0的张量
print(out, out.shape)


#torch.gather
print("torch.gather")
# 生成4*4的tenser，每个元素的值为1-16之间的整数
a = torch.linspace(1, 16, 16).view(4, 4)
print(a)
# 按照列来进行索引，比如[0, 1, 3, 3]就是第三行数字为第一列的第0，第二列的第1， 第三列的第3，第四列的第3
out = torch.gather(a, dim=0,
             index=torch.tensor([[0, 1, 1, 1],
                                 [0, 1, 2, 2],
                                 [0, 1, 3, 3]]))
print(out)
print(out.shape)
#dim=0, out[i, j, k] = input[index[i, j, k], j, k]
#dim=1, out[i, j, k] = input[i, index[i, j, k], k]
#dim=2, out[i, j, k] = input[i, j, index[i, j, k]]


#torch.masked_index
print("torch.masked_index")
a = torch.linspace(1, 16, 16).view(4, 4)
mask = torch.gt(a, 8)
print(a)
print(mask)
# 选出大于8的值生成向量
out = torch.masked_select(a, mask)
print(out)


#torch.take
print("torch.take")
a = torch.linspace(1, 16, 16).view(4, 4)
# 将a看成索引有15的向量，选出index为[0, 15, 13, 10]的元素生成新的向量
b = torch.take(a, index=torch.tensor([0, 15, 13, 10]))
print(b)


#torch.nonzero
print("torch.take")
a = torch.tensor([[0, 1, 2, 0], [2, 3, 0, 1]])
out = torch.nonzero(a)
print(out)
#稀疏表示




