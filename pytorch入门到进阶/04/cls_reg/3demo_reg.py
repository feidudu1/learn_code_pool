import torch
########################################## 解析data
import numpy as np
import re
ff = open("./pytorch入门到进阶/04/cls_reg/housing.data").readlines()
data = []
for item in ff:
    out = re.sub(r"\s{2,}", " ", item).strip()
    print(out)
    data.append(out.split(" "))
data = np.array(data).astype(float)
print(data)
print(data.shape) # (506, 14)

a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
b = a[:2, -1] 
print(b) # [3 6]

Y = data[:, -1]
X = data[:, 0:-1]
print(Y)
print(type(Y))

X_train = X[0:496, ...]
Y_train = Y[0:496, ...]
X_test = X[496:, ...]
Y_test = Y[496:, ...]

print(X_train.shape)
print(Y_train.shape)
print(X_test.shape)
print(Y_test.shape)

########################################### net
# 最简单的线性网络
# class Net(torch.nn.Module):
#     def __init__(self, n_feature, n_output):
#         super(Net, self).__init__()
#         self.predict = torch.nn.Linear(n_feature, n_output)
#     def forward(self, x):
#         out = self.predict(out)
#         return out
# 加入隐藏层
class Net(torch.nn.Module):
    def __init__(self, n_feature, n_output):
        super(Net, self).__init__()
        self.hidden = torch.nn.Linear(n_feature, 100)
        self.predict = torch.nn.Linear(100, n_output)
    def forward(self, x):
        out = self.hidden(x)
        out = torch.relu(out)
        out = self.predict(out)
        return out
    
    
net = Net(13, 1) # 13列为feature，out为最后一列
###########################################loss
loss_func = torch.nn.MSELoss()
########################################### optimiter
# optimizer = torch.optim.SGD(net.parameters(), lr = 0.01)
optimizer = torch.optim.Adam(net.parameters(), lr=0.01)
########################################### training
for i in range(10000):
    x_data = torch.tensor(X_train, dtype=torch.float32)
    y_data = torch.tensor(Y_train, dtype=torch.float32)
    pred = net.forward(x_data)
    pred = torch.squeeze(pred)
    loss = loss_func(pred, y_data) * 0.001

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    print("ite:{}, loss_train:{}".format(i, loss))
    print(pred[0:10])
    print(y_data[0:10])

 ############################################ test
    x_data = torch.tensor(X_test, dtype=torch.float32)
    y_data = torch.tensor(Y_test, dtype=torch.float32)
    pred = net.forward(x_data)
    pred = torch.squeeze(pred)
    loss_test = loss_func(pred, y_data) * 0.001
    print("ite:{}, loss_test:{}".format(i, loss_test))

torch.save(net, "./pytorch入门到进阶/04/cls_reg/model/model.pkl")

# 另一种保存方式，只保存参数
# torch.load("")
# torch.save(net.state_dict(), "params.pkl")
# net.load_state_dict("")
