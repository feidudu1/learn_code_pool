import torch

# if torch.backends.mps.is_available():
#     mps_device = torch.device("mps")
#     x = torch.ones(1, device=mps_device)
#     print (x)
# else:
#     print ("MPS device not found.")

# dev = torch.device("cpu")
dev = torch.device("mps")
a = torch.tensor([2, 2],
                 dtype=torch.float32,
                 device=dev)
print(a)

i = torch.tensor([[0, 1, 2], [0, 1, 2]])
v = torch.tensor([1, 2, 3])
# sparse_coo_tensor生成的稀疏的张量，to_dense是转为稠密的张量
a = torch.sparse_coo_tensor(i, v, (4, 4),
                            dtype=torch.float32)
print(a)
b = torch.sparse_coo_tensor(i, v, (4, 4),
                            dtype=torch.float32).to_dense()
print(b)
c = torch.sparse_coo_tensor(i, v, (4, 4),
                            dtype=torch.float32,
                            device=dev).to_dense()
print(c)






