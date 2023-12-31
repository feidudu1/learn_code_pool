import torch

# reshape
a = torch.rand(2, 3)
print(a)
out = torch.reshape(a, (3, 2))
print(out)


# 转置
print(torch.t(out))


# transpose
print(torch.transpose(out, 0, 1))

a = torch.rand(1, 2, 3)
out = torch.transpose(a, 0, 1)
print(out)
print(out.shape)


# squeeze
out = torch.squeeze(a)
print(out)
print(out.shape)

out = torch.unsqueeze(a, -1)
print(out.shape)

out = torch.unbind(a, dim=2)
print(out)


# flip
print(a)
print(torch.flip(a, dims=[2, 1]))


# 旋转
print(a)
out = torch.rot90(a, -1, dims=[0])
print(out)
out = torch.rot90(a, -1, dims=[1])
print(out)
out = torch.rot90(a, -1, dims=[0, 2])
print(out)
print(out.shape)