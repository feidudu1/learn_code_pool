import torch

a = torch.rand(2, 2)
a = a * 10
print(a)
# tensor([[0.7504, 7.3472],
#         [0.4791, 0.2442]])

print(torch.floor(a))
# tensor([[0., 7.],
#         [0., 0.]])

print(torch.ceil(a))
# tensor([[1., 8.],
#         [1., 1.]])

print(torch.round(a))
# tensor([[1., 7.],
#         [0., 0.]])

# 裁剪，只取整数部分
print(torch.trunc(a))
# tensor([[0., 7.],
#         [0., 0.]])

# 只取小数部分
print(torch.frac(a))
# tensor([[0.7504, 0.3472],
#         [0.4791, 0.2442]])

# 取余
print(a % 2)
# tensor([[0.7504, 1.3472],
#         [0.4791, 0.2442]])

b = torch.tensor([[2, 3], [4, 5]],
                 dtype=torch.float)
print(torch.fmod(a, b))
# tensor([[0.7504, 1.3472],
#         [0.4791, 0.2442]])

print(torch.remainder(a, b))
# tensor([[0.7504, 1.3472],
#         [0.4791, 0.2442]])
